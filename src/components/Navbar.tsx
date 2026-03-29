'use client'

import Link from 'next/link'
import { ShoppingCart, Store } from 'lucide-react'
import { useCart } from '@/lib/cart'

export default function Navbar() {
  const { count, total } = useCart()

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
              <Store className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-slate-900">Digital Files</span>
              <span className="text-xs text-slate-500 block">PDF Guides & Templates</span>
            </div>
          </Link>

          <Link 
            href="/cart"
            className="relative flex items-center gap-2 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl transition-colors"
          >
            <ShoppingCart className="w-5 h-5 text-slate-700" />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
            <span className="font-semibold text-slate-700">£{total.toFixed(2)}</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}
