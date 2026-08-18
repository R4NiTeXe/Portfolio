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
const PARTICLE_COUNT = 44;

function glowTexture(inner: string) {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, inner);
  g.addColorStop(0.38, inner);
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(canvas);
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
    camera.position.x = THREE.MathUtils.damp(camera.position.x, target.current.x * 0.22, 2.5, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, -target.current.y * 0.16, 2.5, delta);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function Particles({ reduced }: { reduced: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const { geometry, state } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const state = new Float32Array(PARTICLE_COUNT * 2);
    const palette = [WHITE, MINT, VIOLET, AMBER];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const radius = 1.32 + Math.random() * 0.85;
      const angle = Math.random() * Math.PI * 2;
      const speed = (Math.random() > 0.5 ? 1 : -1) * (0.04 + Math.random() * 0.09);
      state[i * 2] = radius;
      state[i * 2 + 1] = speed;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(angle) * radius * 0.94;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.9;
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
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const angle = Math.atan2(arr[i * 3 + 1], arr[i * 3]) + state[i * 2 + 1] * delta;
      const radius = state[i * 2];
      arr[i * 3] = Math.cos(angle) * radius;
      arr[i * 3 + 1] = Math.sin(angle) * radius * 0.94;
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={0.045}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.95}
        depthWrite={false}
      />
    </points>
  );
}

function Scene() {
  const reduced = useReducedMotion() ?? false;
  const violetTex = useMemo(() => glowTexture("rgba(139,124,255,0.65)"), []);
  const violetCoreTex = useMemo(() => glowTexture("rgba(255,252,255,0.85)"), []);

  return (
    <>
      <CameraRig reduced={reduced} />
      <sprite position={[-0.9, 0.1, -0.15]} scale={[3.6, 3.6, 1]}>
        <spriteMaterial map={violetTex} transparent depthWrite={false} />
      </sprite>
      <sprite position={[-0.68, 0.95, -0.14]} scale={[1, 1, 1]}>
        <spriteMaterial map={violetCoreTex} transparent depthWrite={false} />
      </sprite>
      <mesh position={[0, 0, -0.02]}>
        <ringGeometry args={[1.16, 1.48, 128, 1, RIM_START, RIM_LEN]} />
        <meshBasicMaterial
          color={MINT}
          transparent
          opacity={0.6}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[0, 0, -0.03]}>
        <ringGeometry args={[1.48, 1.8, 128, 1, RIM_START, RIM_LEN]} />
        <meshBasicMaterial
          color={MINT}
          transparent
          opacity={0.12}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[0, 0, 0.03]}>
        <circleGeometry args={[1, 128]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      <Particles reduced={reduced} />
    </>
  );
}

export function EclipseCanvas() {
  return (
    <Canvas
      orthographic
      camera={{ position: [0, 0, 10], zoom: 100, near: 0.1, far: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ position: "absolute", inset: 0 }}
    >
      <Scene />
    </Canvas>
  );
}