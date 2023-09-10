'use client'

import { forwardRef } from 'react'
import { Canvas, CanvasProps } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import { r3f } from '@/helpers/global'

const Scene = forwardRef<HTMLCanvasElement, Omit<CanvasProps, 'children'>>(({ ...props }) => {
  return (
    <Canvas {...props}>
      <r3f.Out />
      <Preload all />
    </Canvas>
  )
})
Scene.displayName = 'Scene'

export default Scene
