import { globalStyles } from '@/styles/global'
import type { AppProps } from 'next/app'
import Logo from '../assets/logo.svg'
import { BagButton, Container, Header } from '@/styles/pages/app'
import * as Dialog from '@radix-ui/react-dialog'
import { Handbag } from 'phosphor-react'
import { BagModal } from '@/components/Bag'
import Link from 'next/link'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Link href="/">
          <img src={Logo.src} alt="" />
        </Link>

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
