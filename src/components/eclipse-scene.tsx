"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

const MINT = new THREE.Color("#65F6D5");
const WHITE = new THREE.Color("#FFFFFF");
const VIOLET = new THREE.Color("#8B7CFF");
const AMBER = new THREE.Color("#FFB86B");

const PARTICLE_COUNT = 48;
const BRIGHT_COUNT = 7;
const DUST_COUNT = 22;

function glowTexture(core: string, mid: string) {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, core);
  g.addColorStop(0.26, core);
  g.addColorStop(0.58, mid);
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(canvas);
}



// --- Real 3D celestial body: sphere geometry with natural material ---

const bodyVertexShader = `
  varying vec3 vNormal;
  varying vec3 vViewDir;
  varying vec3 vWorldPos;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
    vViewDir = normalize(-mvPos.xyz);
    vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * mvPos;
  }
`;

const bodyFragmentShader = `
  uniform vec3 uBase;
  uniform vec3 uViolet;
  uniform vec3 uMint;
  varying vec3 vNormal;
  varying vec3 vViewDir;
  varying vec3 vWorldPos;
  varying vec2 vUv;
  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
  float vnoise(vec2 p){
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f*f*(3.0-2.0*f);
    float a = hash(i);
    float b = hash(i + vec2(1.0,0.0));
    float c = hash(i + vec2(0.0,1.0));
    float d = hash(i + vec2(1.0,1.0));
    return mix(mix(a,b,f.x), mix(c,d,f.x), f.y);
  }
  float fbm(vec2 p){
    float v = 0.0;
    float a = 0.5;
    for(int i=0;i<3;i++){
      v += a * vnoise(p);
      p *= 2.18;
      a *= 0.46;
    }
    return v;
  }
  void main() {
    vec3 N0 = normalize(vNormal);
    vec3 V = normalize(vViewDir);
    // layered FBM — large form (broad density) + mid structure + micro grain
    float largeForm = fbm(vUv * 2.2 + vec2(0.4, 0.9)) * 0.055 - 0.022; // ~ ±0.028 large
    float midStruct = fbm(vUv * 5.8 + vec2(1.3, 0.7)) * 0.032 - 0.016; // mid
    float microGrain = vnoise(vUv * 18.0 + vec2(2.8, 0.9)) * 0.010 - 0.005;
    float density = largeForm + midStruct * 0.7; // broad variation
    // bump — perturb normal by noise derivatives (cheap)
    vec2 e = vec2(0.008, 0.0);
    float n1 = vnoise(vUv * 6.0);
    float n2 = vnoise(vUv * 6.0 + e.xy);
    float n3 = vnoise(vUv * 6.0 + e.yx);
    vec3 bump = vec3((n2 - n1), (n3 - n1), 0.0) * 0.85;
    vec3 N = normalize(N0 + bump * 0.42);
    // base near-black charcoal with visible but subtle material variation
    vec3 base = uBase + vec3(density * 0.9 + microGrain) + vec3(0.007 * vnoise(vUv*2.0));
    // roughness varies with density — darker patches slightly rougher, lighter slightly smoother -> light breakup
    float roughVar = clamp(0.78 + density * 1.2, 0.72, 0.92);
    // real directional lights — affected by bumped normal
    vec3 Lviolet = normalize(vec3(-0.58, 0.62, 0.72));
    vec3 Lmint = normalize(vec3(0.84, -0.22, 0.62));
    float NdotLviolet = max(dot(N, Lviolet), 0.0);
    float NdotLmint = max(dot(N, Lmint), 0.0);
    float termViolet = pow(NdotLviolet, 1.35 / (0.92 + roughVar*0.18));
    float termMint = pow(NdotLmint, 1.25 / (0.90 + roughVar*0.16));
    float NdotV = clamp(dot(N, V), 0.0, 1.0);
    float fresnel = pow(1.0 - NdotV, 4.1);
    float rimJitter = vnoise(vUv * 4.6 + vec2(0.9, 1.4)) * 0.14 - 0.07;
    float dist = length(vUv - 0.5) * 2.0;
    float edge = smoothstep(0.46, 0.93, dist + rimJitter * 0.48);
    float maskViolet = smoothstep(0.16, 0.66, NdotLviolet);
    float maskMint = smoothstep(0.12, 0.60, NdotLmint);
    float centerMask = smoothstep(0.18, 0.70, dist);
    vec3 violetLight = uViolet * termViolet * maskViolet * edge * 0.15 * (1.0 + vnoise(vUv*5.3)*0.08);
    vec3 mintLight = uMint * termMint * maskMint * edge * 0.11 * (1.0 + vnoise(vUv*5.1+vec2(1.2,0.3))*0.07);
    violetLight *= centerMask;
    mintLight *= centerMask;
    float terminator = smoothstep(0.0, 0.38, NdotLviolet * 0.6 + NdotLmint * 0.4);
    // base responds to terminator with roughness
    vec3 color = base * (0.20 + terminator * (0.14 + (1.0-roughVar)*0.06)) + violetLight + mintLight;
    float curvature = pow(NdotV, 11.0) * (0.012 + largeForm * 0.10);
    color += curvature;
    color += fresnel * edge * 0.005 * vnoise(vUv*7.5);
    // subtle large-scale banding (event-horizon density)
    color += largeForm * 0.018;
    gl_FragColor = vec4(color, 1.0);
  }
`;

const atmosphereVertexShader = `
  varying vec3 vNormal;
  varying vec3 vViewDir;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
    vViewDir = normalize(-mvPos.xyz);
    gl_Position = projectionMatrix * mvPos;
  }
`;

const atmosphereFragmentShader = `
  uniform vec3 uMint;
  uniform vec3 uViolet;
  varying vec3 vNormal;
  varying vec3 vViewDir;
  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
  float vnoise(vec2 p){
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f*f*(3.0-2.0*f);
    float a = hash(i);
    float b = hash(i+vec2(1.0,0.0));
    float c = hash(i+vec2(0.0,1.0));
    float d = hash(i+vec2(1.0,1.0));
    return mix(mix(a,b,f.x), mix(c,d,f.x), f.y);
  }
  void main() {
    vec3 N = normalize(vNormal);
    vec3 V = normalize(vViewDir);
    float fresnel = pow(1.0 - max(dot(N,V),0.0), 3.2);
    // directional light for atmosphere — violet upper-left + mint lower-right
    float dirViolet = max(dot(N, normalize(vec3(-0.62,0.55,0.68))), 0.0);
    float dirMint = max(dot(N, normalize(vec3(0.86,-0.24,0.60))), 0.0);
    float mintMask = smoothstep(0.12, 0.62, dirMint);
    float violetMask = smoothstep(0.16, 0.66, dirViolet);
    // irregular density
    float n = vnoise(gl_FragCoord.xy * 0.008);
    float density = 1.0 + (n - 0.5) * 0.22;
    vec3 col = uMint * fresnel * mintMask * 0.38 * density + uViolet * fresnel * violetMask * 0.16 * density;
    // thin shell — fade inside
    float inside = smoothstep(0.18, 0.62, fresnel);
    col *= inside;
    // irregular corona — not perfect ring
    col *= (0.92 + vnoise(gl_FragCoord.xy * 0.012) * 0.18);
    float alpha = fresnel * (mintMask*0.62 + violetMask*0.32) * 0.55;
    alpha *= inside;
    // keep very subtle, not neon
    gl_FragColor = vec4(col, alpha * 0.72);
  }
`;

function CelestialBody({ reduced }: { reduced: boolean }) {
  const uniforms = useMemo(
    () => ({
      uBase: { value: new THREE.Color("#080C14") },
      uViolet: { value: new THREE.Color("#8B7CFF") },
      uMint: { value: new THREE.Color("#65F6D5") },
    }),
    []
  );
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (reduced || !ref.current) return;
    ref.current.rotation.y += delta * 0.018;
  });
  return (
    <mesh ref={ref} position={[0, 0, 0.02]}>
      <sphereGeometry args={[1, 64, 64]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={bodyVertexShader}
        fragmentShader={bodyFragmentShader}
      />
    </mesh>
  );
}

function AtmosphereShell() {
  const uniforms = useMemo(
    () => ({
      uMint: { value: new THREE.Color("#65F6D5") },
      uViolet: { value: new THREE.Color("#8B7CFF") },
    }),
    []
  );
  return (
    <mesh position={[0, 0, 0.02]} scale={[1.06, 1.06, 1.06]}>
      <sphereGeometry args={[1, 48, 48]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={atmosphereVertexShader}
        fragmentShader={atmosphereFragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

function HeroOrbits({ reduced }: { reduced: boolean }) {
  const gRef = useRef<THREE.Group>(null);
  const dotsRef = useRef<THREE.Points>(null);
  // extremely slow — stable composition at 0/5/15/30s
  const dotState = useMemo(() => {
    return [
      { rx: 1.50, ry: 1.36, inc: 0.33, speed: 0.032, t: Math.random() * Math.PI * 2 },
      { rx: 1.86, ry: 1.60, inc: -0.20, speed: 0.022, t: Math.random() * Math.PI * 2 + 1.7 },
    ];
  }, []);
  const lineGeometries = useMemo(() => {
    const make = (rx: number, ry: number, inc: number, seed: number) => {
      const pts = 140;
      const pos = new Float32Array(pts * 3);
      const alphas = new Float32Array(pts);
      for (let i = 0; i < pts; i++) {
        const th = (i / pts) * Math.PI * 2;
        const ecc = Math.cos(th * 2.0 + seed) * 0.035;
        const incJitter = Math.sin(th * 1.3 + seed) * 0.012;
        const curInc = inc + incJitter;
        const curRx = rx + ecc;
        const curRy = ry + ecc * 0.55;
        const x = Math.cos(th) * curRx;
        const y = Math.sin(th) * curRy * Math.cos(curInc);
        const z = Math.sin(th) * curRy * Math.sin(curInc) + Math.cos(th * 3.0 + seed) * 0.010;
        pos[i * 3] = x;
        pos[i * 3 + 1] = y;
        pos[i * 3 + 2] = z;
        // depth-based alpha: front (z>0) more visible, behind nearly invisible, near body fade
        const distToBody = Math.abs(Math.sqrt(x * x + y * y + z * z) - 1.0);
        const nearFade = distToBody < 0.18 ? distToBody / 0.18 : 1.0; // fade when grazing sphere
        const depthAlpha = z > 0 ? 0.22 + z * 0.08 : 0.018 + (z + 2) * 0.012;
        alphas[i] = Math.max(0, Math.min(1, depthAlpha * nearFade));
      }
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      g.setAttribute("alpha", new THREE.BufferAttribute(alphas, 1));
      return g;
    };
    return [
      make(1.50, 1.36, 0.33, 0.7),
      make(1.86, 1.60, -0.20, 2.1),
    ];
  }, []);
  const dotsGeom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(2 * 3);
    const alphas = new Float32Array(2);
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("alpha", new THREE.BufferAttribute(alphas, 1));
    return g;
  }, []);

  useFrame((_, delta) => {
    if (reduced) return;
    if (gRef.current) gRef.current.rotation.y += delta * 0.0035;
    if (dotsRef.current) {
      const attr = dotsGeom.getAttribute("position") as THREE.BufferAttribute;
      const arr = attr.array as Float32Array;
      const alphaAttr = dotsGeom.getAttribute("alpha") as THREE.BufferAttribute;
      const aArr = alphaAttr.array as Float32Array;
      dotState.forEach((s, idx) => {
        s.t += s.speed * delta;
        const x = Math.cos(s.t) * s.rx;
        const y = Math.sin(s.t) * s.ry * Math.cos(s.inc);
        const z = Math.sin(s.t) * s.ry * Math.sin(s.inc);
        arr[idx * 3] = x;
        arr[idx * 3 + 1] = y;
        arr[idx * 3 + 2] = z;
        // depth-tested: disappear behind body
        const dist = Math.sqrt(x * x + y * y + z * z);
        const behind = z < -0.08 && dist < 1.08;
        aArr[idx] = behind ? 0.0 : z > 0 ? 0.92 : 0.22;
      });
      attr.needsUpdate = true;
      alphaAttr.needsUpdate = true;
    }
  });

  const lineVertexShader = `
    attribute float alpha;
    varying float vAlpha;
    void main() {
      vAlpha = alpha;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;
  const lineFragmentShader = `
    uniform vec3 color;
    uniform float opacity;
    varying float vAlpha;
    void main() {
      gl_FragColor = vec4(color, opacity * vAlpha);
    }
  `;

  return (
    <group ref={gRef}>
      {/* 90% neutral/dark — barely visible, front slightly more */}
      <line>
        <primitive object={lineGeometries[0]} attach="geometry" />
        <shaderMaterial
          vertexShader={lineVertexShader}
          fragmentShader={lineFragmentShader}
          uniforms={{
            color: { value: new THREE.Color("#3D4A5E") },
            opacity: { value: 0.52 },
          }}
          transparent
          depthWrite={false}
          depthTest={true}
        />
      </line>
      <line>
        <primitive object={lineGeometries[1]} attach="geometry" />
        <shaderMaterial
          vertexShader={lineVertexShader}
          fragmentShader={lineFragmentShader}
          uniforms={{
            color: { value: new THREE.Color("#4A5568") },
            opacity: { value: 0.44 },
          }}
          transparent
          depthWrite={false}
          depthTest={true}
        />
      </line>
      {/* tiny beacons — mint + neutral, depth-tested, slow */}
      <points ref={dotsRef} geometry={dotsGeom}>
        <shaderMaterial
          vertexShader={`
            attribute float alpha;
            varying float vAlpha;
            void main() {
              vAlpha = alpha;
              gl_PointSize = 4.2;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            varying float vAlpha;
            void main() {
              float d = distance(gl_PointCoord, vec2(0.5));
              if (d > 0.5) discard;
              float a = (1.0 - smoothstep(0.35, 0.5, d)) * vAlpha;
              gl_FragColor = vec4(vec3(0.40, 0.96, 0.84), a);
            }
          `}
          transparent
          depthWrite={false}
          depthTest={true}
        />
      </points>
    </group>
  );
}

function usePointer() {
  const ref = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      ref.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      ref.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  return ref;
}

function CameraRig({ reduced }: { reduced: boolean }) {
  const target = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  useFrame(({ camera }, delta) => {
    if (reduced) return;
    camera.position.x = THREE.MathUtils.damp(camera.position.x, target.current.x * 0.16, 2.5, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, -target.current.y * 0.11, 2.5, delta);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function OrbitParticles({
  reduced,
  pointer,
}: {
  reduced: boolean;
  pointer: { current: { x: number; y: number } };
}) {
  const { geometry, state } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const state = new Float32Array(PARTICLE_COUNT * 2);
    const palette = [WHITE, MINT, VIOLET, AMBER];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const radius = 1.28 + Math.pow(Math.random(), 1.5) * 0.92;
      const angle = Math.random() * Math.PI * 2;
      const speed = (Math.random() > 0.5 ? 1 : -1) * (0.03 + Math.random() * 0.07);
      state[i * 2] = radius;
      state[i * 2 + 1] = speed;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(angle) * radius * 0.94;
      const band = i % 4;
      positions[i * 3 + 2] =
        band === 0 ? -0.18 - Math.random() * 0.12 : band === 1 ? 0.07 + Math.random() * 0.08 : (Math.random() - 0.5) * 0.28;
      const c = palette[i % 4];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return { geometry, state };
  }, []);

  useFrame((_, delta) => {
    if (reduced) return;
    const attr = geometry.getAttribute("position") as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    const px = pointer.current.x * 0.04;
    const py = pointer.current.y * 0.03;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const angle = Math.atan2(arr[i * 3 + 1], arr[i * 3]) + state[i * 2 + 1] * delta;
      const radius = state[i * 2];
      arr[i * 3] = Math.cos(angle) * radius + px;
      arr[i * 3 + 1] = Math.sin(angle) * radius * 0.94 + py;
    }
    attr.needsUpdate = true;
  });

  return (
    <points geometry={geometry}>
      <pointsMaterial
        size={0.028}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.62}
        depthWrite={false}
      />
    </points>
  );
}

function BrightParticles({
  reduced,
  pointer,
}: {
  reduced: boolean;
  pointer: { current: { x: number; y: number } };
}) {
  const { geometry, state } = useMemo(() => {
    const positions = new Float32Array(BRIGHT_COUNT * 3);
    const colors = new Float32Array(BRIGHT_COUNT * 3);
    const state = new Float32Array(BRIGHT_COUNT * 2);
    const palette = [WHITE, MINT, WHITE, MINT, WHITE, VIOLET, MINT];
    for (let i = 0; i < BRIGHT_COUNT; i++) {
      const radius = 1.35 + Math.random() * 0.6;
      const angle = Math.random() * Math.PI * 2;
      state[i * 2] = radius;
      state[i * 2 + 1] = (Math.random() > 0.5 ? 1 : -1) * (0.02 + Math.random() * 0.03);
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(angle) * radius * 0.94;
      positions[i * 3 + 2] = 0.05 + Math.random() * 0.08;
      const c = palette[i];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return { geometry, state };
  }, []);

  useFrame((_, delta) => {
    if (reduced) return;
    const attr = geometry.getAttribute("position") as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    const px = pointer.current.x * 0.04;
    const py = pointer.current.y * 0.03;
    for (let i = 0; i < BRIGHT_COUNT; i++) {
      const angle = Math.atan2(arr[i * 3 + 1], arr[i * 3]) + state[i * 2 + 1] * delta;
      const radius = state[i * 2];
      arr[i * 3] = Math.cos(angle) * radius + px;
      arr[i * 3 + 1] = Math.sin(angle) * radius * 0.94 + py;
    }
    attr.needsUpdate = true;
  });

  return (
    <points geometry={geometry}>
      <pointsMaterial
        size={0.048}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.78}
        depthWrite={false}
      />
    </points>
  );
}

function DustField({ reduced }: { reduced: boolean }) {
  const { geometry, state } = useMemo(() => {
    const positions = new Float32Array(DUST_COUNT * 3);
    const state = new Float32Array(DUST_COUNT);
    for (let i = 0; i < DUST_COUNT; i++) {
      const radius = 2.1 + Math.random() * 1.6;
      const angle = Math.random() * Math.PI * 2;
      state[i] = (Math.random() > 0.5 ? 1 : -1) * (0.012 + Math.random() * 0.02);
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(angle) * radius * 0.9;
      positions[i * 3 + 2] = -0.12 - Math.random() * 0.1;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return { geometry, state };
  }, []);

  useFrame((_, delta) => {
    if (reduced) return;
    const attr = geometry.getAttribute("position") as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    for (let i = 0; i < DUST_COUNT; i++) {
      const angle = Math.atan2(arr[i * 3 + 1], arr[i * 3]) + state[i] * delta;
      const radius = Math.hypot(arr[i * 3], arr[i * 3 + 1]);
      arr[i * 3] = Math.cos(angle) * radius;
      arr[i * 3 + 1] = Math.sin(angle) * radius * 0.9;
    }
    attr.needsUpdate = true;
  });

  return (
    <points position={[0, 0, -0.12]} geometry={geometry}>
      <pointsMaterial
        size={0.015}
        sizeAttenuation
        color="#9fb4cc"
        transparent
        opacity={0.22}
        depthWrite={false}
      />
    </points>
  );
}

function Scene() {
  const reduced = useReducedMotion() ?? false;
  const pointer = usePointer();
  const groupRef = useRef<THREE.Group>(null);
  const haloRef = useRef<THREE.Sprite>(null);
  const haloLayerRef = useRef<THREE.Sprite>(null);
  const coreRef = useRef<THREE.Sprite>(null);
  const violetTex = useMemo(() => glowTexture("rgba(139,124,255,0.30)", "rgba(139,124,255,0.08)"), []);
  const violetLayerTex = useMemo(() => glowTexture("rgba(139,124,255,0.40)", "rgba(139,124,255,0.11)"), []);
  const violetCoreTex = useMemo(() => glowTexture("rgba(255,252,248,0.92)", "rgba(255,240,235,0.24)"), []);

  useFrame(({ clock }, delta) => {
    if (reduced || !groupRef.current) return;
    groupRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.04) * 0.012;
    if (coreRef.current) {
      const s = 0.68 + Math.sin(clock.elapsedTime * 0.50) * 0.035;
      coreRef.current.scale.setScalar(s);
    }
    if (haloRef.current) {
      haloRef.current.position.x = THREE.MathUtils.damp(
        haloRef.current.position.x,
        -0.62 + pointer.current.x * 0.045,
        3,
        delta
      );
      haloRef.current.position.y = THREE.MathUtils.damp(
        haloRef.current.position.y,
        0.32 - pointer.current.y * 0.035,
        3,
        delta
      );
    }
    if (haloLayerRef.current) {
      haloLayerRef.current.position.x = THREE.MathUtils.damp(
        haloLayerRef.current.position.x,
        -0.48 + pointer.current.x * 0.035,
        3,
        delta
      );
      haloLayerRef.current.position.y = THREE.MathUtils.damp(
        haloLayerRef.current.position.y,
        0.38 - pointer.current.y * 0.028,
        3,
        delta
      );
    }
    if (coreRef.current) {
      coreRef.current.position.x = THREE.MathUtils.damp(
        coreRef.current.position.x,
        -0.48 + pointer.current.x * 0.018,
        3,
        delta
      );
      coreRef.current.position.y = THREE.MathUtils.damp(
        coreRef.current.position.y,
        0.42 - pointer.current.y * 0.018,
        3,
        delta
      );
    }
  });

  return (
    <>
      <CameraRig reduced={reduced} />
      <group ref={groupRef}>
        {/* L1 — distant violet atmosphere */}
        <sprite ref={haloRef} position={[-0.62, 0.32, -0.32]} scale={[4.2, 3.6, 1]}>
          <spriteMaterial map={violetTex} transparent opacity={0.72} depthWrite={false} />
        </sprite>
        {/* L2 — closer violet haze */}
        <sprite ref={haloLayerRef} position={[-0.48, 0.38, -0.18]} scale={[2.3, 2.1, 1]}>
          <spriteMaterial map={violetLayerTex} transparent opacity={0.82} depthWrite={false} />
        </sprite>
        {/* L3 — dust */}
        <DustField reduced={reduced} />
        {/* L4 — hero orbits — 3D inclined ellipses */}
        <HeroOrbits reduced={reduced} />
        {/* L5 — light behind eclipse — occluded, leaks around limb */}
        <sprite ref={coreRef} position={[-0.48, 0.42, -0.09]} scale={[0.68, 0.68, 1]}>
          <spriteMaterial
            map={violetCoreTex}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            opacity={0.52}
          />
        </sprite>
        {/* L6 — real 3D celestial body */}
        <CelestialBody reduced={reduced} />
        {/* L7 — thin atmospheric shell */}
        <AtmosphereShell />
        {/* L8 — particles with depth occlusion */}
        <OrbitParticles reduced={reduced} pointer={pointer} />
        <BrightParticles reduced={reduced} pointer={pointer} />
      </group>
    </>
  );
}

export function EclipseCanvas() {
  const [zoom, setZoom] = useState(100);

  useEffect(() => {
    const update = () => setZoom(window.innerWidth < 768 ? 52 : 100);
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <Canvas
      orthographic
      camera={{ position: [0, 0, 10], zoom, near: 0.1, far: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ position: "absolute", inset: 0 }}
    >
      <Scene />
    </Canvas>
  );
}
