import { styled } from '@stitches/react'
import * as Dialog from '@radix-ui/react-dialog'

export const Overlay = styled(Dialog.Overlay, {
  position: 'fixed',
  width: '100vw',
  height: '100vh',
  inset: 0,
  /* background: rgba(0, 0, 0, 0.75), */
  background: '#00000075',
})

export const Content = styled(Dialog.Overlay, {
  minWidth: '32rem',
  borderRadius: '6px',
  padding: '2.5rem 3rem',
  background: '$gray800',
  color: '$gray300',

  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
})

export const CloseButton = styled(Dialog.Close, {
  position: 'absolute',
  background: 'transparent',
  border: 0,
  top: '1.5rem',
  right: '1.5rem',
  lineHeight: 0,
  cursor: 'pointer',
  color: '$gray300',
})

export const BagContainer = styled('div', {
  marginTop: '2rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
})

export const BagItem = styled('div', {
  display: 'flex',
  gap: '1.25rem',
})

export const ItemImgContainer = styled('div', {
  display: 'flex',
  borderRadius: 6,
  width: 100,
  height: 100,
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',

  img: {
    objectFit: 'cover',
  },
})

export const ItemWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
})

export const ItemName = styled('div', {
  color: '$gray400',
  fontSize: '$md',
})

export const ItemPrice = styled('div', {
  color: '$gray100',
  fontWeight: 'bold',
  fontSize: '$md',
})

export const ItemRemoveButton = styled('span', {
  color: '$green500',
  fontWeight: 'bold',
  background: 'transparent',
  border: 0,
  fontSize: '1rem',
  cursor: 'pointer',

  '&:hover': {
    color: '$green300',
    transition: 'color 0.2s',
  },
})

export const InfoAndCheckout = styled('div', {
  position: 'absolute',
  bottom: '3rem',
  left: '3rem',
  right: '3rem',
  width: 'auto',

  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
})

export const InfoRow = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
})

export const InfoRowBold = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  fontWeight: 'bold',
  color: '$white',
})

export const CheckoutButton = styled('button', {
  background: '$green500',
  borderRadius: 8,
  border: 0,
  width: '100%',
  padding: '1rem',
  fontSize: '$md',
  fontWeight: 'bold',
  color: '$white',
})
