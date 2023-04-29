import {
  SuccessContainer,
  ImageContainer,
  ImageBumbdle,
} from '@/styles/pages/success'
import Link from 'next/link'
import Image from 'next/image'
import { GetServerSideProps } from 'next'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'
import Head from 'next/head'
import { useContext } from 'react'
import { BagContext } from '@/contexts/BagContext'

interface Product {
  name: string
  imageUrl: string
}

interface SuccessProps {
  costumerName: string
  bagId: number
  product: Product
  products: Product[]
}

export default function Success({
  costumerName,
  products,
  bagId,
}: SuccessProps) {
  const { deleteBag } = useContext(BagContext)

  deleteBag(bagId)

  return (
    <>
      <Head>
        <title>Success | Ignite Shop</title>
      </Head>

      <SuccessContainer>
        <h1>Successfully Bought</h1>

        <ImageBumbdle>
          {products.map((product) => {
            return (
              <ImageContainer key={product.imageUrl}>
                <Image src={product.imageUrl} width={120} height={110} alt="" />
              </ImageContainer>
            )
          })}
        </ImageBumbdle>

        <p>
          Uhuu!! <strong>{costumerName}</strong>, Your{' '}
          {products.length === 1 ? (
            'T-shirt is on its way to your home.'
          ) : (
            <>
              <strong>{products.length}</strong> T-shirts are on their way to
              your home.{' '}
            </>
          )}
        </p>

        <Link href="/">Return to catalog</Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const sessionId = String(query.session_id)
  const bagId = Number(query.bagId)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  })

  const costumerName = session.customer_details?.name
  const product = session.line_items?.data[0].price?.product as Stripe.Product

  const products = session.line_items?.data.map((item) => {
    const tempProduct = item.price?.product as Stripe.Product
    return {
      name: tempProduct.name,
      imageUrl: tempProduct.images[0],
    }
  })

  return {
    props: {
      costumerName,
      products,
      product: {
        name: product.name,
        imageUrl: product.images[0],
      },
      bagId,
    },
  }
}
