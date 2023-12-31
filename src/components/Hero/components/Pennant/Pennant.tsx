import { MutableRefObject, RefObject, createRef, forwardRef, memo, useEffect, useRef, useState } from "react";
import { useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { DoubleSide, type Mesh, Object3D } from "three";
import { type Triplet, usePlane, useSphere, useParticle, PublicApi, useDistanceConstraint } from "@react-three/cannon";

import texturePng from "./assets/pennant.png";
import alphaMapPng from "./assets/alphaMap.png";

const WIDTH = 4
const HEIGHT = 4
const RESOLUTIONX = 16
const RESOLUTIONY = 16
const distanceX = WIDTH / RESOLUTIONX
const distanceY = HEIGHT / RESOLUTIONY
const distanceDiagonal = Math.sqrt(distanceX * distanceX + distanceY * distanceY)

type Particle = {
  particle: MutableRefObject<Object3D>
  api: PublicApi
}

interface ParticleProps {
  mass: number;
  position: Triplet;
}
const Particle = memo(
  forwardRef<{
    particle: MutableRefObject<Object3D>;
    api: PublicApi;
  }, ParticleProps>(({ mass, position }, ref) => {
    let [particle, api] = useParticle<Mesh>(() => ({
      mass,
      position,
      // args: [0.3],
      linearDamping: 0.2
    }))

    if (ref && particle.current && typeof ref === 'object') {
      ref.current = { particle, api };
    }

    return (
      <mesh ref={particle}>
        <sphereGeometry args={[0.1, 32, 32]} />
        <meshStandardMaterial color={'red'} />
      </mesh>
    )
  })
)

interface StitchProps {
  p1: RefObject<Particle>;
  p2: RefObject<Particle>;
  distance: number;
}
const Stitch = memo<StitchProps>(({ p1, p2, distance = 0.1 }) => {
  useDistanceConstraint(p1.current.particle, p2.current.particle, {
    distance
  })

  return null
})
Stitch.displayName = "Stitch";

const Pennant = forwardRef<any, any>((props, ref) => {
  const pennantTexture = useTexture(texturePng.src);
  const alphaMap = useTexture(alphaMapPng.src);
  const { viewport } = useThree();
  const [readyForStitches, setReadyForStitches] = useState(false)

  const particles = useRef(Array.from({ length: RESOLUTIONY }, () => Array.from<RefObject<Particle>, RefObject<Particle>>({ length: RESOLUTIONX }, createRef)))

  useEffect(() => {
    setReadyForStitches(true)
  }, [])

  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    if (particles.current[0][0]) {
      const geom = meshRef.current.geometry;
      const positions = geom.attributes.position.array;

      positions.forEach((v, vi) => {
        const x = vi % RESOLUTIONX
        const y = Math.floor(vi / RESOLUTIONX)
        if (particles.current[y] && particles.current[y][x].current) {
      console.log('test1')  

          geom.attributes.position.setXYZ(vi, ... particles.current[y][x].current.particle.current.position.toArray())
        }
      })

      geom.attributes.position.needsUpdate = true;
      geom.computeVertexNormals();
    }
  });

  const halfScreenWidth = viewport.width / 2 - 0.4;
  const halfScreenHeight = viewport.height / 2 - 0.51;

  const [pennantRef, api] = usePlane<Mesh>(() => ({
    mass: 0,
    args: [0.5, 1],
    position: [-halfScreenWidth, halfScreenHeight, 0.1],
  }));

  return (
    <group>
      <mesh ref={meshRef}>
        <planeGeometry args={[WIDTH, HEIGHT, RESOLUTIONX - 1, RESOLUTIONY - 1]} />
        <meshStandardMaterial color={'red'} side={DoubleSide} />
      </mesh>

      {particles.current.map((y, yi) =>
        y.map((x, xi) => (
          <Particle
            ref={x}
            mass={yi === 0 && (xi < 2 || xi > RESOLUTIONX - 3) ? 0 : (1 / WIDTH) * HEIGHT}
            key={yi + '-' + xi}
            position={[(xi * WIDTH) / RESOLUTIONX, (yi * -HEIGHT) / RESOLUTIONX + 2, 0]}
          />
        ))
      )}
      {readyForStitches &&
        particles.current.map((y, yi) =>
          y.map((x, xi) => {
            return (
              <>
                {xi < RESOLUTIONX - 1 && (
                  <Stitch key={yi + '-' + xi + 'x'} p1={x} p2={particles.current[yi][xi + 1]} distance={distanceX} />
                )}
                {yi < RESOLUTIONY - 1 && (
                  <Stitch key={yi + '-' + xi + 'y'} p1={x} p2={particles.current[yi + 1][xi]} distance={distanceY} />
                )}
                {yi < RESOLUTIONY - 1 && xi < RESOLUTIONX - 1 && (
                  <Stitch key={yi + '-' + xi + 's1'} p1={x} p2={particles.current[yi + 1][xi + 1]} distance={distanceDiagonal} />
                )}
                {yi > 0 && xi < RESOLUTIONX - 1 && (
                  <Stitch key={yi + '-' + xi + 's2'} p1={x} p2={particles.current[yi - 1][xi + 1]} distance={distanceDiagonal} />
                )}
              </>
            )
          })
        )}
    </group>
  );
});

Pennant.displayName = "Pennant";
export default Pennant;
