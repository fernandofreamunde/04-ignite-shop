import { produce } from 'immer'
import { ActionTypes } from './actions'

export interface ProductTag {
  name: string
}

export interface Product {
  priceId: string
  name: string
  picture: string
  price: number
}

export interface BagEntryPayload {
  quantity: number
  product: Product
}

interface BagState {
  bag: BagEntryPayload[]
}

interface StateAction {
  type: ActionTypes
  payload: any
}

export function BagReducer(state: BagState, action: StateAction) {
  switch (action.type) {
    case ActionTypes.ADD_ITEM_TO_BAG:
      return produce(state, (draft) => {
        draft.bag.push(action.payload)
      })

    case ActionTypes.CHANGE_ITEM_QUANTITY:
      return produce(state, (draft) => {
        const index = state.bag.findIndex((item) => {
          return item.product.priceId === action.payload.product.priceId
        })

        if (index < 0) {
          return state
        }

        draft.bag[index] = action.payload
      })

    case ActionTypes.REMOVE_ITEM_FROM_BAG:
      return produce(state, (draft) => {
        const index = state.bag.findIndex((item) => {
          return item.product.priceId === action.payload.priceId
        })

        if (index < 0) {
          return state
        }

        draft.bag.splice(index, 1)
      })

    case ActionTypes.EMPTY_BAG:
      return produce(state, (draft) => {
        draft.bag = []
      })

    default:
      return state
  }
}
