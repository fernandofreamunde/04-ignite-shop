import { globalStyles } from '@/styles/global'
import type { AppProps } from 'next/app'
import Logo from '../assets/logo.svg'
import { BagButton, Container, Header } from '@/styles/pages/app'
import * as Dialog from '@radix-ui/react-dialog'
import { Handbag } from 'phosphor-react'
import { BagModal } from '@/components/Bag'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <img src={Logo.src} alt="" />

        {/*  */}
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <BagButton>
              <Handbag size={24} />
            </BagButton>
          </Dialog.Trigger>

          <BagModal />
        </Dialog.Root>
      </Header>

      <Component {...pageProps} />
    </Container>
  )
}
