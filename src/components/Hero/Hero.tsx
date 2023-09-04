import { FC, Suspense, useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const View = dynamic(() => import('@/components/View').then((mod) => mod.View), { ssr: false });
import David from "./components/David";
import Background from "./components/Background";
import Pennant from "./components/Pennant";
import styled from "@emotion/styled";
import { Physics } from "@react-three/cannon"

const Hero: FC = () => {
  const cloth = useRef(null);
  const handleMouseMove = (event) => {
    const x = (event.clientX - window.innerWidth / 2) / window.innerWidth;
    const y = -(event.clientY - window.innerHeight / 2) / window.innerHeight;
  
    // Sprawdź, czy cloth.current jest zdefiniowane i ma właściwość geometry
    if (cloth.current && cloth.current.geometry) {
      const geometry = cloth.current.geometry;
  
      // Iteruj przez wierzchołki geometrii i aktualizuj ich pozycję
      geometry.vertices.forEach((vertex) => {
        vertex.x += x * 6;
        vertex.y += y * 6;
      });
  
      // Odśwież geometrię i oblicz normale wierzchołków
      geometry.verticesNeedUpdate = true;
      geometry.computeVertexNormals();
    }
  };
  
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <Wrapper>
      <directionalLight position={[1, 1, 1]} />
      <Suspense fallback={null}>
        <Physics iterations={10} gravity={[0, -20, 0]}>
          <Pennant ref={cloth} />
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
