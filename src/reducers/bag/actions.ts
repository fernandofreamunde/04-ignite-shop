import { BagEntryPayload, Product } from './reducer'

export enum ActionTypes {
  ADD_ITEM_TO_BAG = 'ADD_ITEM_TO_BAG',
  REMOVE_ITEM_FROM_BAG = 'REMOVE_ITEM_FROM_BAG',
  CHANGE_ITEM_QUANTITY = 'CHANGE_ITEM_QUANTITY',
  EMPTY_BAG = 'EMPTY_BAG',
}

export function addItemToBag(bagEntry: BagEntryPayload) {
  return {
    type: ActionTypes.ADD_ITEM_TO_BAG,
    payload: bagEntry,
  }
}

export function changeQuantityOfItemInBag(bagEntry: BagEntryPayload) {
  return {
    type: ActionTypes.CHANGE_ITEM_QUANTITY,
    payload: bagEntry,
  }
}

export function removeItemFromBag(product: Product) {
  return {
    type: ActionTypes.REMOVE_ITEM_FROM_BAG,
    payload: product,
  }
}

export function emptyBag() {
  return {
    type: ActionTypes.EMPTY_BAG,
    payload: '',
  }
}
