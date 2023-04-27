import {
  BagContainer,
  BagItem,
  CheckoutButton,
  CloseButton,
  Content,
  InfoAndCheckout,
  InfoRow,
  InfoRowBold,
  ItemImgContainer,
  ItemName,
  ItemPrice,
  ItemRemoveButton,
  ItemWrapper,
  Overlay,
} from '@/styles/components/bag'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'phosphor-react'
import img1 from '@/assets/Shirt/1.png'
import img2 from '@/assets/Shirt/2.png'
import img3 from '@/assets/Shirt/3.png'
import Image from 'next/image'

export function BagModal() {
  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Shopping Bag</Dialog.Title>

        <CloseButton>
          <X size={24} />
        </CloseButton>

        <BagContainer>
          <BagItem>
            <ItemImgContainer>
              <Image src={img2} alt="" width={100} />
            </ItemImgContainer>

            <ItemWrapper>
              <ItemName>Camiseta Beyond the Limits</ItemName>
              <ItemPrice>123 €</ItemPrice>
              <ItemRemoveButton>Remove</ItemRemoveButton>
            </ItemWrapper>
          </BagItem>

          {/*  */}
          <BagItem>
            <ItemImgContainer>
              <Image src={img2} alt="" width={100} />
            </ItemImgContainer>

            <ItemWrapper>
              <ItemName>Camiseta Beyond the Limits</ItemName>
              <ItemPrice>123 €</ItemPrice>
              <ItemRemoveButton>Remove</ItemRemoveButton>
            </ItemWrapper>
          </BagItem>

          <BagItem>
            <ItemImgContainer>
              <Image src={img2} alt="" width={100} />
            </ItemImgContainer>

            <ItemWrapper>
              <ItemName>Camiseta Beyond the Limits</ItemName>
              <ItemPrice>123 €</ItemPrice>
              <ItemRemoveButton>Remove</ItemRemoveButton>
            </ItemWrapper>
          </BagItem>
          {/*  */}
        </BagContainer>

        <InfoAndCheckout>
          <InfoRow>
            <span>Quantity</span>
            <span>3 items</span>
          </InfoRow>
          <InfoRowBold>
            <span>Total</span>
            <span>369 €</span>
          </InfoRowBold>

          <CheckoutButton>Checkout</CheckoutButton>
        </InfoAndCheckout>
      </Content>
    </Dialog.Portal>
  )
}
