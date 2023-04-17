import { globalStyles } from '@/styles/global'
import type { AppProps } from 'next/app'
import Logo from '../assets/logo.svg'
import { Container, Header } from '@/styles/pages/app'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <img src={Logo.src} alt="" />
      </Header>

      <Component {...pageProps} />
    </Container>
  )
}
