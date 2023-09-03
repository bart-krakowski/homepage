'use client'
import Hero from '@/components/Hero'
import '@/global.css'
import styled from '@emotion/styled'

export default function Page() {
  return (
    <Wrapper>
      <Hero />
    </Wrapper>
  )
}

const Wrapper = styled.main`
  background-color: #1C1E23;
  height: 100vh;
  width: 100vw;
`
