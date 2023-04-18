import { HomeContainer, Product } from "@/styles/pages/home";
import Image from "next/image";
import { useKeenSlider } from 'keen-slider/react'

import 'keen-slider/keen-slider.min.css'

import shirt1 from '../assets/Shirt/1.png'
import shirt2 from '../assets/Shirt/2.png'
import shirt3 from '../assets/Shirt/3.png'
import shirt4 from '../assets/Shirt/4.png'
import shirt5 from '../assets/Shirt/5.png'
import { stripe } from "@/lib/stripe";
import { GetServerSideProps } from "next";
import Stripe from "stripe";

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
  }[]
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48
    }
  })

  return (
    <HomeContainer ref={sliderRef} className='keen-slider' >

      {products.map(product => {
        return (
          <Product key={product.id} className="keen-slider__slide">
            <Image src={product.imageUrl} width={520} height={480} alt="" />
            <footer>
              <strong>{product.name}</strong>
              <span>{product.price} €</span>
            </footer>
          </Product>
        )
      })}
    
    </HomeContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  console.log(response.data)
  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount,
    }
  })

  return {
    props: {
      products
    }
  }
  
}
