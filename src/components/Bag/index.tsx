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
import Image from 'next/image'
import { useContext, useEffect, useState } from 'react'
import { BagContext } from '@/contexts/BagContext'
import axios from 'axios'
import { Product } from '@/reducers/bag/reducer'

export function BagModal() {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)
  const { bag, removeFromBag } = useContext(BagContext)

  const productTotal = bag.reduce((total, item) => {
    return total + 1 * Number(item.product.price)
  }, 0)

  const productTotalFormatted = new Intl.NumberFormat('pt-PT', {
    style: 'currency',
    currency: 'EUR',
  }).format(productTotal)

  async function handleBuyButtonPressed() {
    try {
      setIsCreatingCheckoutSession(true)

      const response = await axios.post('/api/checkout', {
        items: bag.map((bagItem) => {
          return {
            price: bagItem.product.priceId,
            quantity: 1,
          }
        }),
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch (err) {
      setIsCreatingCheckoutSession(false)

      alert('failed to redirect to the checkout!')
    }
  }

  function handleRemoveButtonPressed(product: Product) {
    removeFromBag(product)
  }

  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Shopping Bag</Dialog.Title>

        <CloseButton>
          <X size={24} />
        </CloseButton>

        <BagContainer>
          {bag.map((bagItem) => {
            return (
              <BagItem key={bagItem.product.priceId}>
                <ItemImgContainer>
                  <Image
                    src={bagItem.product.picture}
                    alt=""
                    width={100}
                    height={100}
                  />
                </ItemImgContainer>

                <ItemWrapper>
                  <ItemName>{bagItem.product.name}</ItemName>

                  <ItemPrice>
                    {new Intl.NumberFormat('pt-PT', {
                      style: 'currency',
                      currency: 'EUR',
                    }).format(bagItem.product.price)}
                  </ItemPrice>
                  <ItemRemoveButton
                    onClick={() => handleRemoveButtonPressed(bagItem.product)}
                  >
                    Remove
                  </ItemRemoveButton>
                </ItemWrapper>
              </BagItem>
            )
          })}
        </BagContainer>

        <InfoAndCheckout>
          <InfoRow>
            <span>Quantity</span>
            <span>{bag.length} items</span>
          </InfoRow>
          <InfoRowBold>
            <span>Total</span>
            <span>{productTotalFormatted}</span>
          </InfoRowBold>

          <CheckoutButton
            onClick={handleBuyButtonPressed}
            disabled={isCreatingCheckoutSession}
          >
            Checkout
          </CheckoutButton>
        </InfoAndCheckout>
      </Content>
    </Dialog.Portal>
  )
}
