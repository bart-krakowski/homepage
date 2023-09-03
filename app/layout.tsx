import { Layout } from '@/components/Layout'
import { FC, PropsWithChildren } from 'react'
import '@/global.css'

export const metadata = {
  title: 'Bart Krakowski',
}

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  <html lang='en'>
    <head />
    <body>
      <Layout>{children}</Layout>
    </body>
  </html>
)

export default RootLayout
