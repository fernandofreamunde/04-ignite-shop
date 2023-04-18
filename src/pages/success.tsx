import { SuccessContainer, ImageContainer} from "@/styles/pages/success";
import Link from "next/link";
import Img1 from '../assets/Shirt/4.png'
import Image from "next/image";
import { GetServerSideProps } from "next";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";

interface SuccessProps {
  costumerName: string;
  product: {
    name: string;
    imageUrl: string;
  }
}

export default function Success({ costumerName, product }: SuccessProps) {
  return (
    <SuccessContainer>
    <h1>Successfully Bought</h1>

    <ImageContainer>
      <Image src={product.imageUrl} width={120} height={110} alt="" />
    </ImageContainer>

    <p>
      Uhuu!! <strong>{costumerName}</strong>, Your <strong>{product.name}</strong> is on its way to your home.
    </p>

    <Link href="/">
      Return to catalog
    </Link>
  </SuccessContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }
  
  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  })

  const costumerName = session.customer_details?.name
  const product = session.line_items?.data[0].price?.product as Stripe.Product

  return {
    props: {
      costumerName,
      product: {
        name: product.name,
        imageUrl: product.images[0]
      }
    }
  }
}
