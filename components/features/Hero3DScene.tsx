"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";

const ACCENT = new THREE.Color("#38BDF8");
const VIOLET = new THREE.Color("#8B5CF6");
const BURST_CAPACITY = 160;
const BURST_COUNT = 18;
const PARTICLE_COUNT = 420;
const ORIBITER_COUNT = 3;

const BREATHE_SCALE = new THREE.Vector3();
const SHOCK_ORIGIN = new THREE.Vector3();

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

function createFieldGeometry(): THREE.BufferGeometry {
  const rand = mulberry32(42);
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    positions[i * 3] = (rand() - 0.5) * 16;
    positions[i * 3 + 1] = (rand() - 0.5) * 16;
    positions[i * 3 + 2] = (rand() - 0.5) * 16;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  return geometry;
}

interface BurstData {
  positions: Float32Array;
  velocities: Float32Array;
  lives: Float32Array;
  maxLives: Float32Array;
  cursor: number;
}

function createBurstData(): BurstData {
  return {
    positions: new Float32Array(BURST_CAPACITY * 3).fill(-10000),
    velocities: new Float32Array(BURST_CAPACITY * 3),
    lives: new Float32Array(BURST_CAPACITY),
    maxLives: new Float32Array(BURST_CAPACITY),
    cursor: 0,
  };
}

const burstData = createBurstData();

function HeroScene() {
  const { camera } = useThree();
  const cameraRef = useRef(camera);

  const groupRef = useRef<THREE.Group>(null);
  const shellRef = useRef<THREE.Mesh>(null);
  const shellMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const glowMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const ringMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const orbitersRef = useRef<THREE.Group>(null);
  const fieldRef = useRef<THREE.Points>(null);
  const burstPointsRef = useRef<THREE.Points>(null);
  const burstAttrRef = useRef<THREE.BufferAttribute>(null);
  const shockRef = useRef<THREE.Mesh>(null);
  const shockMatRef = useRef<THREE.MeshBasicMaterial>(null);

  const scrollRef = useRef(0);
  const tiltXRef = useRef(0);
  const tiltYRef = useRef(0);
  const hoverRef = useRef(false);
  const pulseRef = useRef(0);
  const kickRef = useRef(0);
  const shockTimeRef = useRef(-1);

  const fieldGeometry = useMemo(() => createFieldGeometry(), []);

  const orbiterData = useMemo(() => {
    const rand = mulberry32(7);
    return Array.from({ length: ORIBITER_COUNT }, (_, i) => ({
      radius: 1.7 + rand() * 0.9,
      speed: (0.4 + rand() * 0.5) * (i % 2 === 0 ? 1 : -1),
      phase: rand() * Math.PI * 2,
    }));
  }, []);

  function spawnBurst(point: THREE.Vector3) {
    for (let i = 0; i < BURST_COUNT; i++) {
      const idx = burstData.cursor;
      burstData.cursor = (idx + 1) % BURST_CAPACITY;
      burstData.positions[idx * 3] = point.x;
      burstData.positions[idx * 3 + 1] = point.y;
      burstData.positions[idx * 3 + 2] = point.z;
      const spread = 2.4;
      burstData.velocities[idx * 3] = (Math.random() - 0.5) * spread;
      burstData.velocities[idx * 3 + 1] = Math.random() * spread * 0.9 + 0.5;
      burstData.velocities[idx * 3 + 2] = (Math.random() - 0.5) * spread;
      burstData.maxLives[idx] = burstData.lives[idx] =
        1.1 + Math.random() * 0.7;
    }
    shockTimeRef.current = 0;
    SHOCK_ORIGIN.copy(point);
    pulseRef.current = 1;
    kickRef.current = 0.45;
  }

  function handleClick(event: ThreeEvent<MouseEvent>) {
    spawnBurst(event.point);
  }

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    const pointer = state.pointer;
    const cameraRefLocal = cameraRef.current;

    const targetScroll = Math.min(
      Math.max(window.scrollY / (window.innerHeight * 0.8), 0),
      1.4,
    );
    scrollRef.current +=
      (targetScroll - scrollRef.current) * Math.min(delta * 4, 1);

    tiltXRef.current +=
      (pointer.y - tiltXRef.current) * Math.min(delta * 5, 1);
    tiltYRef.current +=
      (pointer.x - tiltYRef.current) * Math.min(delta * 5, 1);

    kickRef.current *= Math.pow(0.9, delta * 60);
    cameraRefLocal.position.z = 7 - scrollRef.current * 1.1 + kickRef.current;
    cameraRefLocal.position.x = tiltYRef.current * 0.55;
    cameraRefLocal.position.y = tiltXRef.current * 0.35;
    cameraRefLocal.lookAt(0, 0, 0);

    if (groupRef.current) {
      groupRef.current.rotation.x = tiltXRef.current * 0.18;
      groupRef.current.rotation.y = tiltYRef.current * 0.28;
    }

    if (shellRef.current) {
      shellRef.current.rotation.y += delta * (0.25 + scrollRef.current * 1.2);
      shellRef.current.rotation.x += delta * 0.06;
      const breathe = hoverRef.current
        ? 0.05 + Math.sin(time * 2) * 0.02
        : 0;
      BREATHE_SCALE.setScalar(1 + breathe);
      shellRef.current.scale.lerp(BREATHE_SCALE, Math.min(delta * 4, 1));
    }
    if (shellMatRef.current) {
      shellMatRef.current.color
        .copy(ACCENT)
        .lerp(VIOLET, (Math.sin(time * 0.6) + 1) * 0.175);
    }

    if (innerRef.current) {
      innerRef.current.rotation.y -= delta * (0.45 + scrollRef.current * 0.9);
      innerRef.current.rotation.z += delta * 0.15;
    }

    if (glowRef.current) {
      pulseRef.current *= Math.pow(0.92, delta * 60);
      const scale = 1 + pulseRef.current * 0.5;
      glowRef.current.scale.set(scale, scale, scale);
    }
    if (glowMatRef.current) {
      glowMatRef.current.opacity = 0.55 + pulseRef.current * 0.3;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z = scrollRef.current * Math.PI * 2;
      ringRef.current.rotation.x = Math.PI / 2 + tiltXRef.current * 0.4;
      ringRef.current.rotation.y = tiltYRef.current * 0.5;
    }
    if (ringMatRef.current) {
      ringMatRef.current.opacity = 0.35 + scrollRef.current * 0.2;
    }

    if (orbitersRef.current) {
      orbitersRef.current.children.forEach((child, index) => {
        const orbiter = orbiterData[index];
        const angle =
          orbiter.phase + time * orbiter.speed + scrollRef.current * 2;
        child.position.set(
          Math.cos(angle) * orbiter.radius,
          Math.sin(angle * 0.8) * orbiter.radius * 0.55,
          Math.sin(angle) * orbiter.radius * 0.6,
        );
      });
    }

    if (fieldRef.current) {
      fieldRef.current.rotation.y += delta * scrollRef.current * 0.5;
      fieldRef.current.rotation.x = tiltXRef.current * 0.1;
    }

    const positions = burstData.positions;
    const velocities = burstData.velocities;
    const lives = burstData.lives;
    let anyAlive = false;
    for (let i = 0; i < BURST_CAPACITY; i++) {
      if (lives[i] <= 0) continue;
      lives[i] -= delta;
      if (lives[i] <= 0) {
        positions[i * 3 + 1] = -10000;
        continue;
      }
      anyAlive = true;
      velocities[i * 3 + 1] -= 3 * delta;
      positions[i * 3] += velocities[i * 3] * delta;
      positions[i * 3 + 1] += velocities[i * 3 + 1] * delta;
      positions[i * 3 + 2] += velocities[i * 3 + 2] * delta;
    }
    if (anyAlive && burstAttrRef.current) {
      burstAttrRef.current.needsUpdate = true;
    }

    if (shockRef.current && shockMatRef.current) {
      if (shockTimeRef.current >= 0) {
        shockTimeRef.current += delta * 2.2;
        if (shockTimeRef.current >= 1) {
          shockTimeRef.current = -1;
          shockRef.current.visible = false;
        } else {
          const scale = 0.6 + shockTimeRef.current * 5.5;
          shockRef.current.scale.set(scale, scale, scale);
          shockRef.current.position.copy(SHOCK_ORIGIN);
          shockRef.current.quaternion.copy(cameraRefLocal.quaternion);
          shockMatRef.current.opacity = (1 - shockTimeRef.current) * 0.8;
          shockRef.current.visible = true;
        }
      }
    }
  });

  return (
    <group
      onClick={handleClick}
      onPointerEnter={() => {
        hoverRef.current = true;
      }}
      onPointerLeave={() => {
        hoverRef.current = false;
      }}
    >
      <mesh>
        <sphereGeometry args={[9, 24, 24]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      <mesh ref={shellRef}>
        <icosahedronGeometry args={[2.2, 1]} />
        <meshBasicMaterial
          ref={shellMatRef}
          color={ACCENT}
          wireframe
          transparent
          opacity={0.55}
        />
      </mesh>

      <mesh ref={innerRef}>
        <icosahedronGeometry args={[1.1, 0]} />
        <meshBasicMaterial color={VIOLET} wireframe transparent opacity={0.5} />
      </mesh>

      <mesh ref={glowRef}>
        <sphereGeometry args={[1.05, 24, 24]} />
        <meshBasicMaterial
          ref={glowMatRef}
          color={ACCENT}
          transparent
          opacity={0.55}
          depthWrite={false}
        />
      </mesh>

      <mesh ref={ringRef}>
        <torusGeometry args={[3.1, 0.02, 12, 96]} />
        <meshBasicMaterial
          ref={ringMatRef}
          color={ACCENT}
          transparent
          opacity={0.35}
        />
      </mesh>

      <group ref={orbitersRef}>
        {orbiterData.map((_, index) => (
          <mesh key={index}>
            <icosahedronGeometry args={[0.09 + index * 0.03, 0]} />
            <meshBasicMaterial color={index === 1 ? VIOLET : ACCENT} />
          </mesh>
        ))}
      </group>

      <points ref={fieldRef} geometry={fieldGeometry}>
        <pointsMaterial
          size={0.045}
          color={ACCENT}
          transparent
          opacity={0.7}
          depthWrite={false}
          sizeAttenuation
        />
      </points>

      <points ref={burstPointsRef}>
        <bufferGeometry>
          <bufferAttribute
            ref={burstAttrRef}
            attach="attributes-position"
            args={[burstData.positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.09}
          color={ACCENT}
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      <mesh ref={shockRef} visible={false}>
        <ringGeometry args={[0.5, 0.62, 64]} />
        <meshBasicMaterial
          ref={shockMatRef}
          color={VIOLET}
          transparent
          opacity={0}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

export function Hero3DScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 7], fov: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <HeroScene />
    </Canvas>
  );
}