import { NextResponse } from 'next/server'
import Stripe from 'stripe'

export async function POST(request: Request) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 })
    }
    
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    const { items, email, name } = await request.json()

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map((item: any) => ({
        price_data: {
          currency: 'gbp',
          product_data: {
            name: item.name,
          },
          unit_amount: item.price, // Price in pence (£6 = 600)
        },
        quantity: 1,
      })),
      mode: 'payment',
      success_url: `${request.headers.get('origin') || 'https://your-site.vercel.app'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get('origin') || 'https://your-site.vercel.app'}/cart`,
      customer_email: email,
      metadata: {
        customer_name: name,
        items: JSON.stringify(items.map((i: any) => i.name)),
      },
    })

    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (error: any) {
    console.error('Stripe error:', error)
    return NextResponse.json(
      { error: error.message || 'Checkout failed' },
      { status: 500 }
    )
  }
}
