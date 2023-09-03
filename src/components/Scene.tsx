'use client'

import { type FC } from 'react'
import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import { r3f } from '@/helpers/global'

const Scene: FC = ({ ...props }) => {
  return (
    <Canvas {...props}>
      <r3f.Out />
      <Preload all />
    </Canvas>
  )
}

export default Scene
