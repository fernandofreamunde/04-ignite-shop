import {
  addItemToBag,
  changeQuantityOfItemInBag,
  emptyBag,
  removeItemFromBag,
} from '@/reducers/bag/actions'
import { BagReducer, Product } from '@/reducers/bag/reducer'
import axios from 'axios'
import {
  ReactNode,
  createContext,
  useEffect,
  useReducer,
  useState,
} from 'react'

export interface BagItem {
  quantity: number
  product: Product
}

interface BagContextType {
  bag: BagItem[]
  addProductToBag: (data: BagItem) => void
  increaseItemQuantity: (product: Product) => void
  decreaseItemQuantity: (product: Product) => void
  removeFromBag: (product: Product) => void
  clearBag: () => void
}

export const BagContext = createContext({} as BagContextType)

interface BagContextProviderProps {
  children: ReactNode
}

export function BagContextProvider({ children }: BagContextProviderProps) {
  const [bagState, dispatch] = useReducer(BagReducer, { bag: [] })
  const { bag } = bagState
  const [bagId, setBagId] = useState(0)

  async function addProductToBag(data: BagItem) {
    const index = bag.findIndex((item) => {
      return item.product.priceId === data.product.priceId
    })

    if (index === -1) {
      dispatch(addItemToBag(data))
      await axios.post('/api/bag', {
        action: 'add',
        bagId,
        priceId: data.product.priceId,
      })

      return
    }

    increaseItemQuantity(data.product)
  }

  function increaseItemQuantity(product: Product) {
    changeQuantityInBag('add', product)
  }

  function decreaseItemQuantity(product: Product) {
    changeQuantityInBag('subtract', product)
  }

  function changeQuantityInBag(action: 'add' | 'subtract', product: Product) {
    const index = bag.findIndex((item) => {
      return item.product.priceId === product.priceId
    })

    let { quantity } = bag[index]

    quantity = action === 'add' ? quantity + 1 : quantity - 1
    if (quantity !== 0) {
      dispatch(changeQuantityOfItemInBag({ product, quantity }))
    }
  }

  function clearBag() {
    dispatch(emptyBag())
  }

  async function removeFromBag(product: Product) {
    await axios.post('/api/bag', {
      action: 'remove',
      bagId,
      priceId: product.priceId,
    })
    dispatch(removeItemFromBag(product))
  }

  async function findBags() {
    try {
      const storedJson = localStorage.getItem('@Ignite-Shop:bag-state:0.0.0')

      if (storedJson) {
        const cart = JSON.parse(storedJson)
        setBagId(cart.id)
        return
      }

      throw new Error('local cart not found, trigger create a nerw one.')
    } catch (err) {
      const response = await axios.post('/api/bag', {
        action: 'create',
      })

      const cartJson = JSON.stringify(response.data)
      localStorage.setItem('@Ignite-Shop:bag-state:0.0.0', cartJson)
      setBagId(response.data.id)
    }
  }

  useEffect(() => {
    findBags()
  }, [])

  return (
    <BagContext.Provider
      value={{
        bag,
        addProductToBag,
        decreaseItemQuantity,
        increaseItemQuantity,
        removeFromBag,
        clearBag,
      }}
    >
      {children}
    </BagContext.Provider>
  )
}
