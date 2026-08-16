"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function OuterShell() {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.x += delta * 0.12;
    mesh.current.rotation.y += delta * 0.18;
  });

  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[1.35, 1]} />
      <meshBasicMaterial
        color="#38BDF8"
        wireframe
        transparent
        opacity={0.35}
      />
    </mesh>
  );
}

function InnerCore() {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = -state.clock.elapsedTime * 0.12;
    mesh.current.rotation.x = -state.clock.elapsedTime * 0.08;
  });

  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[0.72, 1]} />
      <meshBasicMaterial
        color="#8B5CF6"
        wireframe
        transparent
        opacity={0.55}
      />
    </mesh>
  );
}

function CenterGlow() {
  return (
    <mesh>
      <sphereGeometry args={[0.28, 24, 24]} />
      <meshBasicMaterial color="#38BDF8" transparent opacity={0.85} />
    </mesh>
  );
}

function OrbitRing() {
  const ring = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ring.current) return;
    ring.current.rotation.z = state.clock.elapsedTime * 0.1;
  });

  return (
    <mesh ref={ring} rotation={[Math.PI / 2.2, 0, 0]}>
      <torusGeometry args={[2.05, 0.012, 12, 120]} />
      <meshBasicMaterial color="#8B5CF6" transparent opacity={0.4} />
    </mesh>
  );
}

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function ParticleField() {
  const points = useRef<THREE.Points>(null);
  const geometry = useMemo(() => {
    const count = 420;
    const rand = mulberry32(42);
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (rand() - 0.5) * 16;
      positions[i * 3 + 1] = (rand() - 0.5) * 16;
      positions[i * 3 + 2] = (rand() - 0.5) * 16;
    }
    const buffer = new THREE.BufferGeometry();
    buffer.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3),
    );
    return buffer;
  }, []);

  useFrame((state) => {
    if (!points.current) return;
    points.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial
        color="#94A3B8"
        size={0.028}
        sizeAttenuation
        transparent
        opacity={0.55}
        depthWrite={false}
      />
    </points>
  );
}

export function Hero3DScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.2], fov: 45 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      aria-hidden="true"
    >
      <group position={[0, 0, 0]}>
        <OuterShell />
        <InnerCore />
        <CenterGlow />
        <OrbitRing />
        <ParticleField />
      </group>
    </Canvas>
  );
}