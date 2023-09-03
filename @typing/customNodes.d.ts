import { HeroBackgroundMaterial } from '@/components/Hero/components/Background'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      heroBackgroundMaterial: ReactThreeFiber.Object3DNode<HeroBackgroundMaterial, typeof HeroBackgroundMaterial>
    }
  }
}
