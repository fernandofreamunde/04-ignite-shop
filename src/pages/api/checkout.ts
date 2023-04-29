import { stripe } from '@/lib/stripe'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { items, bagId } = req.body

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' })
  }

  if (!items) {
    return res.status(400).json({ error: 'Price not found.' })
  }

  if (!bagId) {
    return res.status(400).json({ error: 'bag not found.' })
  }

  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}&bagId=${bagId}`
  const cancelUrl = `${process.env.NEXT_URL}`

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: 'payment',
    line_items: items,
    // line_items: [
    //   {
    //     price: priceId,
    //     quantity: 1,
    //   },
    // ],
  })

  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  })
}
