import { type FC, useRef } from "react"
import { shaderMaterial } from "@react-three/drei"
import { extend, useFrame, useThree } from "@react-three/fiber"

import vertexShader from './shaders/hero.vert.glsl'
import fragmentShader from './shaders/hero.frag.glsl'

const Background: FC = () => {
  const { width, height } = useThree(({ viewport }) => viewport)
  const uniformsRef = useRef({
    uTime: 0,
  })
  useFrame(({ clock }) => {
    uniformsRef.current.uTime = clock.getElapsedTime() / 10
  })

  return (
    <mesh position={[0, 0, 0]}>
      <planeGeometry args={[width, height]} />
      <heroBackgroundMaterial ref={uniformsRef} transparent={true} receiceShadows={true} />
    </mesh>
  )
}

export default Background

export const HeroBackgroundMaterial = shaderMaterial(
  {
    uTime: 0,
    uAmplitudeX: 0.3,
    uAmplitudeY: 0.1,
    uCleanliness: 280,
    uBrightness: [0.3725, 0.4667, 0.5176],
    uContrast: [0.3529, 0.3961, 0.3608],
    uOscilation: [1, 1, 1],
    uPhase: [0, 0, 0],
  },
  vertexShader,
  fragmentShader
)
extend({ HeroBackgroundMaterial })
