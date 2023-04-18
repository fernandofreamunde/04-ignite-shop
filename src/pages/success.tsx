import { SuccessContainer, ImageContainer} from "@/styles/pages/success";
import Link from "next/link";
import Img1 from '../assets/Shirt/4.png'
import Image from "next/image";

export default function Success() {
  return (
    <SuccessContainer>
    <h1>Successfully Bought</h1>

    <ImageContainer>
      <Image src={Img1} width={120} height={110} alt="" />
    </ImageContainer>

    <p>
      Uhuu!! <strong>Diego Fernandes</strong>, Your <strong>Camiseta Beyond the Limits</strong> is on its wat to your home.
    </p>

    <Link href="/">
      Return to catalog
    </Link>
  </SuccessContainer>
  )
}
