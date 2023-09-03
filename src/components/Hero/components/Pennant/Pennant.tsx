import React, { useRef } from "react";
import { useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { DoubleSide, Vector3, type Mesh } from "three";
import { type Triplet, usePlane, useSphere } from "@react-three/cannon";

import texturePng from "./assets/pennant.png";
import alphaMapPng from "./assets/alphaMap.png";

const Pennant = () => {
  const pennantTexture = useTexture(texturePng.src);
  const alphaMap = useTexture(alphaMapPng.src);
  const { viewport } = useThree();

  const halfScreenWidth = viewport.width / 2 - 0.4;
  const halfScreenHeight = viewport.height / 2 - 0.51;

  const [pennantRef, api] = usePlane<Mesh>(() => ({
    mass: 0,
    args: [0.5, 1],
    position: [-halfScreenWidth, halfScreenHeight, 0.1],
  }));

  const windForce = useRef<Triplet>([0.0, 0.0, 0.05]);

  useFrame(() => {
    // Aplikuj siłę wiatru do fladzy
    api.applyForce(windForce.current, [0, 0, 0]);
  });

  const pennantPosition = useRef<Vector3>(new Vector3(0, 0, 0.1));

  useFrame(() => {
    // Aktualizuj pozycję fladzy
    pennantRef.current.position.copy(pennantPosition.current);
  });

  return (
    <mesh
      ref={pennantRef}
      castShadow
      receiveShadow
    >
      <planeGeometry args={[0.5, 1]} />
      <meshBasicMaterial side={DoubleSide} map={pennantTexture} alphaMap={alphaMap} transparent />
    </mesh>
  );
};

export default Pennant;
