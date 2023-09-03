import { FC, Suspense, useRef } from "react";
import dynamic from "next/dynamic";

const View = dynamic(() => import('@/components/View').then((mod) => mod.View), { ssr: false });
import David from "./components/David";
import Background from "./components/Background";
import Pennant from "./components/Pennant";
import styled from "@emotion/styled";
import { Physics } from "@react-three/cannon";

const Hero: FC = () => {
  const cloth = useRef(null);
  return (
    <Wrapper>
      <Suspense fallback={null}>
        <Physics iterations={10} gravity={[0, -20, 0]}>
          <Pennant ref={cloth} width={4} height={4} resolutionX={16} resolutionY={16} />
        </Physics>
        {/* <David />
        <Background /> */}
      </Suspense>
    </Wrapper>
  )
}

export default Hero

const Wrapper = styled(View)`
  height: 100vh;
  width: 100vw;
`
