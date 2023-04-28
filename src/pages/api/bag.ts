import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

interface BagItem {
  priceId: string
}

interface Bag {
  id: number
  items: BagItem[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  /*
  actions: 
  find cart -> find : { bagId } -
  create cart -> create : {} -
  add item to cart -> add : { bagId, priceId }
  remove item from cart -> remove : { bagId, priceId }
  delete cart -> delete : { bagId } -
  */
  const bags: Bag[] = []

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' })
  }

  const { action, bagId, priceId } = req.body

  if (!action) {
    return res.status(400).json({ error: 'Action not defined.' })
  }

  if (action === 'create') {
    const response = await axios.post('http://localhost:3333/bags', {
      id: Math.floor(Math.random() * 2000000),
      items: [],
    })

    return res.status(201).json(response.data)
  }

  if (!bagId) {
    return res.status(400).json({ error: 'Bag not found.' })
  }

  if (action === 'delete') {
    await axios.delete(`http://localhost:3333/bags/${bagId}`)
    return res.status(204).json({ message: 'Bag deleted.' })
  }

  if (action === 'find') {
    try {
      const response = await axios.get(`http://localhost:3333/bags/${bagId}`)

      return res.status(200).json(response.data)
    } catch (error) {
      return res.status(404).json({ error: 'Bag not found.' })
    }
  }

  if (action === 'add' || action === 'remove') {
    try {
      const response = await axios.get(`http://localhost:3333/bags/${bagId}`)
      const bag = response.data

      if (action === 'remove') {
        const itemToDelete = bag.items.find(
          (item: { priceId: string }) => item.priceId === priceId,
        )
        bag.items.splice(bag.items.indexOf(itemToDelete), 1)
      } else {
        if (bag.items.indexOf(priceId) === -1) {
          bag.items.push(priceId)
        }
      }

      const putResp = await axios.put(`http://localhost:3333/bags/${bagId}`, {
        id: bag.id,
        items: bag.items,
      })

      return res.status(200).json(putResp.data)
    } catch (error) {
      return res.status(404).json({ error: 'Bag not found.' })
    }
  }

  // if (action === 'remove') {
  //   const bag = bags.find((cart) => cart.id === bagId)
  //   const itemToDelete = bag?.items.find((item) => item.priceId === priceId)

  //   if (!bag) {
  //     return res.status(404).json({ error: 'Bag not found.' })
  //   }

  //   if (!itemToDelete) {
  //     return res.status(404).json({ error: 'Item not found.' })
  //   }

  //   bag.items.splice(bag.items.indexOf(itemToDelete), 1)

  //   return res.status(200).json(bag)
  // }
}
