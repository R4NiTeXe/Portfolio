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

const RIM_START = Math.PI * 1.5 + 0.08;
const RIM_LEN = Math.PI / 2 + 0.42;
const PARTICLE_COUNT = 48;
const BRIGHT_COUNT = 7;
const DUST_COUNT = 22;

/* Soft multi-stop glow sprite texture — smoother, less geometric falloff */
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

/*
 * Accretion rim texture — radial gradient + bright arc segments on canvas,
 * applied to circleGeometry with repeat.x=-1 to flip horizontally.
 * Verified to place mint on the RIGHT / lower-right of the screen.
 */
function rimTexture() {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(101,246,213,0.55)");
  g.addColorStop(0.25, "rgba(101,246,213,0.2)");
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  // soft outer arcs only — no pie wedge, no radial hard lines
  const arcs = [
    { a: RIM_START + RIM_LEN * 0.06, len: RIM_LEN * 0.12, opacity: 0.22 },
    { a: RIM_START + RIM_LEN * 0.9, len: RIM_LEN * 0.15, opacity: 0.18 },
    { a: 2 * Math.PI + 0.1, len: 0.42, opacity: 0.14 },
  ];
  ctx.lineCap = "round";
  for (const arc of arcs) {
    ctx.beginPath();
    // draw as soft ring segment near the perimeter, not a filled wedge
    const r = size * 0.47;
    ctx.arc(size / 2, size / 2, r, arc.a - arc.len / 2, arc.a + arc.len / 2);
    ctx.strokeStyle = `rgba(101,246,213,${arc.opacity})`;
    ctx.lineWidth = size * 0.06;
    ctx.shadowColor = "rgba(101,246,213,0.55)";
    ctx.shadowBlur = size * 0.04;
    ctx.stroke();
    ctx.shadowBlur = 0;
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  return tex;
}

/*
 * Black-hole disk texture — lifted for dimensional depth:
 * Center remains very dark but not pure black; directional casts
 * are slightly stronger; edge dissolve is restrained so the rim
 * light can define the silhouette instead of black-on-black.
 */
function blackHoleTexture() {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const c = size / 2;

  /* base body — lifted center for curvature perception */
  const g = ctx.createRadialGradient(size * 0.42, size * 0.4, size * 0.04, c, c, c);
  g.addColorStop(0, "#1A2640");
  g.addColorStop(0.32, "#132034");
  g.addColorStop(0.55, "#0E182C");
  g.addColorStop(0.78, "#0A1322");
  g.addColorStop(0.92, "#070E1A");
  g.addColorStop(1, "#050A14");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);

  /* violet directional cast — upper-left limb, slightly stronger */
  const v = ctx.createRadialGradient(size * 0.26, size * 0.26, 0, size * 0.26, size * 0.26, size * 0.46);
  v.addColorStop(0, "rgba(139,124,255,0.18)");
  v.addColorStop(0.45, "rgba(139,124,255,0.06)");
  v.addColorStop(1, "rgba(139,124,255,0)");
  ctx.fillStyle = v;
  ctx.fillRect(0, 0, size, size);

  /* mint cast — lower-right limb, restrained */
  const m = ctx.createRadialGradient(size * 0.76, size * 0.78, 0, size * 0.76, size * 0.78, size * 0.52);
  m.addColorStop(0, "rgba(101,246,213,0.11)");
  m.addColorStop(0.5, "rgba(101,246,213,0.04)");
  m.addColorStop(1, "rgba(101,246,213,0)");
  ctx.fillStyle = m;
  ctx.fillRect(0, 0, size, size);

  /* restrained edge falloff — was 0.55 black at rim, now subtle */
  const e = ctx.createRadialGradient(c, c, c * 0.88, c, c, c);
  e.addColorStop(0, "rgba(0,0,0,0)");
  e.addColorStop(0.72, "rgba(0,0,0,0)");
  e.addColorStop(1, "rgba(0,0,0,0.22)");
  ctx.fillStyle = e;
  ctx.fillRect(0, 0, size, size);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/* Dimensional disk shader — fake hemisphere normal on a flat CircleGeometry,
 * Fresnel rim driven by view direction, asymmetric violet (upper-left) / mint (right).
 * Center stays very dark; edge Fresnel becomes visible, giving curvature
 * without a full PBR light rig. */
const diskVertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewDir;
  void main() {
    vUv = uv;
    vec3 pos = position;
    float r2 = dot(pos.xy, pos.xy);
    float z = sqrt(max(0.0, 1.0 - r2));
    // hemisphere normal, slightly flattened for restrained curvature
    vec3 n = normalize(vec3(pos.xy * 0.62, z));
    vNormal = normalize(normalMatrix * n);
    vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
    vViewDir = normalize(-mvPos.xyz);
    gl_Position = projectionMatrix * mvPos;
  }
`;

const diskFragmentShader = `
  uniform sampler2D uTex;
  uniform vec3 uViolet;
  uniform vec3 uMint;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewDir;
  void main() {
    vec3 tex = texture2D(uTex, vUv).rgb;
    // keep base very dark — eclipse identity dominates
    vec3 base = tex * 0.97;
    float NdotV = clamp(dot(normalize(vNormal), normalize(vViewDir)), 0.0, 1.0);
    float fresnel = pow(1.0 - NdotV, 4.4);
    vec3 lightVioletDir = normalize(vec3(-0.64, 0.56, 0.72));
    vec3 lightMintDir = normalize(vec3(0.88, -0.24, 0.58));
    float dirViolet = max(dot(normalize(vNormal), lightVioletDir), 0.0);
    float dirMint = max(dot(normalize(vNormal), lightMintDir), 0.0);
    float maskViolet = smoothstep(0.18, 0.68, dirViolet);
    float maskMint = smoothstep(0.14, 0.62, dirMint);
    float dist = length(vUv - 0.5) * 2.0;
    float edge = smoothstep(0.48, 0.94, dist);
    // restrained asymmetric rim — was 0.46/0.42, now half for eclipse weight
    vec3 violetRim = uViolet * fresnel * maskViolet * edge * 0.22;
    vec3 mintRim = uMint * fresnel * maskMint * edge * 0.19;
    // keep center extremely dark: only edge contributes
    float centerMask = smoothstep(0.18, 0.68, dist);
    violetRim *= centerMask;
    mintRim *= centerMask;
    vec3 color = base + violetRim + mintRim;
    // faint inner curvature, barely perceptible
    float curvature = pow(NdotV, 11.0) * 0.014;
    color += curvature;
    gl_FragColor = vec4(color, 1.0);
  }
`;

function EclipseDisk({ diskTex }: { diskTex: THREE.Texture }) {
  const uniforms = useMemo(
    () => ({
      uTex: { value: diskTex },
      uViolet: { value: new THREE.Color("#8B7CFF") },
      uMint: { value: new THREE.Color("#65F6D5") },
    }),
    [diskTex]
  );
  return (
    <mesh position={[0, 0, 0.03]}>
      <circleGeometry args={[1, 128]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={diskVertexShader}
        fragmentShader={diskFragmentShader}
      />
    </mesh>
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
      /* bias toward the eclipse: denser just outside the disk edge */
      const radius = 1.24 + Math.pow(Math.random(), 1.5) * 0.95;
      const angle = Math.random() * Math.PI * 2;
      const speed = (Math.random() > 0.5 ? 1 : -1) * (0.03 + Math.random() * 0.07);
      state[i * 2] = radius;
      state[i * 2 + 1] = speed;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(angle) * radius * 0.94;
      /* multiple depth levels: some behind the disk, some in front */
      const band = i % 4;
      positions[i * 3 + 2] =
        band === 0 ? -0.15 - Math.random() * 0.1 : band === 1 ? 0.08 + Math.random() * 0.08 : (Math.random() - 0.5) * 0.3;
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
        size={0.032}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.75}
        depthWrite={false}
      />
    </points>
  );
}

/* A few restrained brighter foreground particles — highlights, not a starfield */
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
        size={0.055}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.9}
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
        opacity={0.28}
        depthWrite={false}
      />
    </points>
  );
}

function RimTraveler({ reduced }: { reduced: boolean }) {
  const ref = useRef<THREE.Sprite>(null);
  const tex = useMemo(() => glowTexture("rgba(101,246,213,0.6)", "rgba(101,246,213,0.18)"), []);

  useFrame(({ clock }) => {
    if (reduced || !ref.current) return;
    const t = ((clock.elapsedTime * 0.16) % 1 + 1) % 1;
    const angle = RIM_START + t * RIM_LEN;
    const r = 1.26;
    ref.current.position.set(Math.cos(angle) * r, Math.sin(angle) * r, 0.02);
  });

  return (
    <sprite ref={ref} scale={[0.24, 0.24, 1]}>
      <spriteMaterial map={tex} transparent depthWrite={false} />
    </sprite>
  );
}

function Scene() {
  const reduced = useReducedMotion() ?? false;
  const pointer = usePointer();
  const groupRef = useRef<THREE.Group>(null);
  const haloRef = useRef<THREE.Sprite>(null);
  const haloLayerRef = useRef<THREE.Sprite>(null);
  const coreRef = useRef<THREE.Sprite>(null);
  const violetTex = useMemo(() => glowTexture("rgba(139,124,255,0.34)", "rgba(139,124,255,0.1)"), []);
  const violetLayerTex = useMemo(() => glowTexture("rgba(139,124,255,0.44)", "rgba(139,124,255,0.14)"), []);
  const violetCoreTex = useMemo(() => glowTexture("rgba(255,252,248,0.95)", "rgba(255,240,235,0.28)"), []);
  const rimPointTex = useMemo(() => glowTexture("rgba(101,246,213,0.9)", "rgba(101,246,213,0.24)"), []);
  const diskTex = useMemo(() => blackHoleTexture(), []);
  const rimTex = useMemo(() => rimTexture(), []);

  useFrame(({ clock }, delta) => {
    if (reduced || !groupRef.current) return;
    groupRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.05) * 0.02;
    if (coreRef.current) {
      const s = 0.72 + Math.sin(clock.elapsedTime * 0.55) * 0.045;
      coreRef.current.scale.setScalar(s);
    }
    if (haloRef.current) {
      haloRef.current.position.x = THREE.MathUtils.damp(
        haloRef.current.position.x,
        -0.7 + pointer.current.x * 0.05,
        3,
        delta
      );
      haloRef.current.position.y = THREE.MathUtils.damp(
        haloRef.current.position.y,
        0.35 - pointer.current.y * 0.04,
        3,
        delta
      );
    }
    if (haloLayerRef.current) {
      haloLayerRef.current.position.x = THREE.MathUtils.damp(
        haloLayerRef.current.position.x,
        -0.55 + pointer.current.x * 0.04,
        3,
        delta
      );
      haloLayerRef.current.position.y = THREE.MathUtils.damp(
        haloLayerRef.current.position.y,
        0.42 - pointer.current.y * 0.03,
        3,
        delta
      );
    }
    if (coreRef.current) {
      coreRef.current.position.x = THREE.MathUtils.damp(
        coreRef.current.position.x,
        -0.52 + pointer.current.x * 0.02,
        3,
        delta
      );
      coreRef.current.position.y = THREE.MathUtils.damp(
        coreRef.current.position.y,
        0.48 - pointer.current.y * 0.02,
        3,
        delta
      );
    }
  });

  return (
    <>
      <CameraRig reduced={reduced} />
      <group ref={groupRef}>
        {/* L1 — distant violet atmosphere, directional from upper-left */}
        <sprite ref={haloRef} position={[-0.7, 0.35, -0.3]} scale={[4.6, 4.0, 1]}>
          <spriteMaterial map={violetTex} transparent opacity={0.85} depthWrite={false} />
        </sprite>
        {/* L2 — violet glow close behind the disk */}
        <sprite ref={haloLayerRef} position={[-0.55, 0.42, -0.18]} scale={[2.5, 2.3, 1]}>
          <spriteMaterial map={violetLayerTex} transparent depthWrite={false} />
        </sprite>
        {/* L3 — distant dust, behind everything */}
        <DustField reduced={reduced} />
        {/* L4 — white-hot core, contained BEHIND the eclipse, restrained */}
        <sprite ref={coreRef} position={[-0.52, 0.48, -0.05]} scale={[0.72, 0.72, 1]}>
          <spriteMaterial
            map={violetCoreTex}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            opacity={0.62}
          />
        </sprite>
        {/* L5 — dimensional eclipse disk (shader Fresnel, center remains dark) */}
        <EclipseDisk diskTex={diskTex} />
        {/* L6 — mint accretion light, wraps around the disk (front edge, asymmetric, restrained) */}
        <mesh position={[0, 0, 0.04]}>
          <circleGeometry args={[1.6, 96]} />
          <meshBasicMaterial
            map={rimTex}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            opacity={0.38}
          />
        </mesh>
        {/* L7 — controlled foreground mint hot point (right/lower-right) */}
        <sprite position={[1.28, -0.08, 0.035]} scale={[0.26, 0.26, 1]}>
          <spriteMaterial map={rimPointTex} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
        </sprite>
        {/* L8 — subtle energy pulse along the rim */}
        <RimTraveler reduced={reduced} />
        {/* L9 — particles: orbit field + restrained bright highlights */}
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