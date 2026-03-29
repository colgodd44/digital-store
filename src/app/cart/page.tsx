'use client'

import Link from 'next/link'
import { Trash2, ArrowLeft, ShoppingBag } from 'lucide-react'
import { useCart } from '@/lib/cart'

export default function CartPage() {
  const { items, removeItem, clearCart, total } = useCart()

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center px-4">
          <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-12 h-12 text-slate-400" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Your cart is empty</h1>
          <p className="text-slate-500 mb-6">Browse our digital files and add to cart</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Browse Files
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-50 pb-32">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Your Cart ({items.length})</h1>

        {/* Cart Items */}
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl p-4 flex items-center gap-4 shadow-sm"
            >
              <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center text-3xl">
                {item.image}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900">{item.name}</h3>
                <p className="text-sm text-slate-500">Digital PDF File</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-slate-900">£{item.price}.00</p>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="p-2 text-slate-400 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        {/* Clear Cart */}
        <button
          onClick={clearCart}
          className="text-sm text-slate-500 hover:text-red-500 mt-4"
        >
          Clear cart
        </button>

        {/* Order Summary */}
        <div className="mt-8 bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Order Summary</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-600">Subtotal ({items.length} items)</span>
              <span className="font-medium">£{total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Processing Fee</span>
              <span className="text-green-600 font-medium">FREE</span>
            </div>
            <div className="border-t border-slate-100 pt-3 flex justify-between">
              <span className="font-semibold text-slate-900">Total</span>
              <span className="font-bold text-xl text-slate-900">£{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Button - Fixed Bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/checkout"
            className="block w-full bg-green-500 text-white text-center py-4 rounded-xl font-bold text-lg hover:bg-green-600 transition-colors"
          >
            Proceed to Checkout - £{total.toFixed(2)}
          </Link>
          <p className="text-center text-xs text-slate-500 mt-2">
            Secure checkout powered by Stripe
          </p>
        </div>
      </div>
    </main>
  )
}
