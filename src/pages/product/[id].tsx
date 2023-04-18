import { ImageContainer, ProductContainer, ProductDetails } from "@/styles/pages/product"
import { useRouter } from "next/router"
import Image from "next/image";
import Img1 from '../../assets/Shirt/2.png'

export default function Product() {
  const { query } = useRouter()
  return (
    <ProductContainer>
      <ImageContainer>
        <Image src={Img1} width={520} height={480} alt=""/>
      </ImageContainer>

      <ProductDetails>
        <h1>tshirt X</h1>
        <span>€ 65.00</span>

        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi placeat ab similique autem ex maiores labore vel obcaecati porro veniam, enim inventore, eligendi maxime aut vero veritatis, nihil corporis suscipit!
        </p>

        <button>
          Buy now
        </button>

      </ProductDetails>
    </ProductContainer>
  )
}
