import { styled } from '..'

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  minHeight: '100vh',
})

export const Header = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',

  display: 'flex',
  justifyContent: 'space-between',
})

export const BagButton = styled('button', {
  display: 'flex',
  alignItems: 'center',
  padding: '12px',
  gap: '12px',

  width: '48px',
  height: '48px',

  /* Grayscale/Elements */

  background: '$gray800',
  color: '$gray300',
  borderRadius: '6px',

  /* Inside auto layout */

  flex: 'none',
  border: 0,
  order: 0,
  flexGrow: 0,
})
