import { useFrame } from "@react-three/fiber"
import { useRef, type FC } from "react"
import { Center, Stage, useGLTF } from "@react-three/drei"
import { easing } from "maath"
import { Color, Group, Mesh } from 'three'

import model from "./assets/david.glb"

const David: FC = () => {
  const { scene } = useGLTF(model)
  const group = useRef<Mesh>(null)

  useFrame((state, delta) => {
    const maxYRotation = Math.PI / 16;
    const baseYRotation = Math.PI / 4;
    const targetYRotation = baseYRotation + (state.pointer.x * maxYRotation);

    const maxXRotation = Math.PI / 16;
    const baseXRotation = 0;
    const targetXRotation = baseXRotation + (-state.pointer.y * maxXRotation);

    easing.dampE(group.current.rotation, [targetXRotation, targetYRotation, 0], 1.5, delta);
  })

  return (
    <>
      <pointLight intensity={5} color={new Color(`rgb(90, 101, 92)`)} position={[10, 10, 10]} />
      <primitive castShadow={true} receiveShadow={true} object={scene} ref={group} scale={7} position={[0, 0, 0]} rotation={[0, Math.PI / 4, 0]} />
    </>
  )
}

export default David
