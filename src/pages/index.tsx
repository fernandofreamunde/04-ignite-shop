import { HomeContainer, Product } from "@/styles/pages/home";
import Image from "next/image";

// import shirt1 from '../assets/Shirt/1.png'
import shirt2 from '../assets/Shirt/2.png'
import shirt3 from '../assets/Shirt/3.png'
import shirt4 from '../assets/Shirt/4.png'
import shirt5 from '../assets/Shirt/5.png'

export default function Home() {
  return (
    <HomeContainer>
      <Product >
        <Image src={shirt3} width={520} height={480} alt="" />
        <footer>
          <strong>Tshirt 3</strong>
          <span>30.00 €</span>
        </footer>
      </Product>
      <Product >
        <Image src={shirt2} width={520} height={480} alt="" />
        <footer>
          <strong>Tshirt 2</strong>
          <span>30.00 €</span>
        </footer>
      </Product>
    </HomeContainer>
  )
}
