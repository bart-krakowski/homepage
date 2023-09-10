'use client'

import { useRef } from 'react'
import dynamic from 'next/dynamic'
import styled from '@emotion/styled'
const Scene = dynamic(() => import('@/components/Scene'), { ssr: false })

const Layout = ({ children }) => {
  const ref = useRef()

  return (
    <Wrapper
      ref={ref}
    >
      {children}
      <Scene
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
        }}
        eventSource={ref}
        eventPrefix='client'
      />
    </Wrapper>
  )
}

export { Layout }

const Wrapper = styled.div`
  position: relative;
  width:  100%;
  height: 100%;
  overflow: auto;
  touch-action: auto;
`
