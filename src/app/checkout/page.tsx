'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/lib/cart'
import { ArrowLeft, Lock, CreditCard } from 'lucide-react'
import { loadStripe } from '@stripe/stripe-js'

// Your Stripe publishable key
const stripePromise = loadStripe('pk_live_51TBNFg3L8L69H38KGtJcLOV52CL61xqW83VdqSWfiQdYSufeKHI61wjY5ayC8TekGWA0S8619NXBAEtSmhZ06f7L00JlKPxTSf')

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState('')

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Your cart is empty</h1>
          <p className="text-slate-500 mb-6">Add some items before checking out</p>
          <Link href="/" className="text-green-500 font-semibold hover:underline">
            Back to shop
          </Link>
        </div>
      </main>
    )
  }

  const handleCheckout = async () => {
    if (!email || !name) {
      setError('Please fill in all fields')
      return
    }

    setIsProcessing(true)
    setError('')

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price * 100, // Price in pence
          })),
          email,
          name,
        }),
      })

      if (!response.ok) {
        throw new Error('Checkout failed')
      }

      const { url, error } = await response.json()
      
      if (error) {
        throw new Error(error)
      }

      if (url) {
        // Redirect to Stripe Checkout
        window.location.href = url
      } else {
        throw new Error('No checkout URL returned')
      }
    } catch (err: any) {
      setError(err.message || 'Payment failed')
      setIsProcessing(false)
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 pb-32">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/cart"
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-slate-600" />
          </Link>
          <h1 className="text-2xl font-bold text-slate-900">Checkout</h1>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <h2 className="font-semibold text-slate-900 mb-4">Your Files</h2>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.image}</span>
                  <span className="text-slate-700">{item.name}</span>
                </div>
                <span className="font-medium">£{item.price}.00</span>
              </div>
            ))}
          </div>
          <div className="border-t border-slate-100 mt-4 pt-4 flex justify-between font-bold">
            <span>Total</span>
            <span>£{total.toFixed(2)}</span>
          </div>
        </div>

        {/* Customer Info */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <h2 className="font-semibold text-slate-900 mb-4">Your Details</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
              />
              <p className="text-xs text-slate-500 mt-1">
                Your download link will be sent to this email
              </p>
            </div>
          </div>
        </div>

        {/* Payment */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="font-semibold text-slate-900 mb-4">Payment</h2>
          <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl mb-4">
            <CreditCard className="w-6 h-6 text-slate-600" />
            <span className="text-slate-700">Pay with card (Stripe)</span>
          </div>
          {error && (
            <p className="text-red-500 text-sm mb-4">{error}</p>
          )}
          <button
            onClick={handleCheckout}
            disabled={isProcessing}
            className="w-full bg-green-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Lock className="w-5 h-5" />
            {isProcessing ? 'Processing...' : `Pay £${total.toFixed(2)}`}
          </button>
          <p className="text-center text-xs text-slate-500 mt-3 flex items-center justify-center gap-1">
            <Lock className="w-3 h-3" />
            Secured by Stripe • Your data is protected
          </p>
        </div>
      </div>
    </main>
  )
}
