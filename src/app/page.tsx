'use client'

import { useState } from 'react'
import { PRODUCTS, CATEGORIES } from '@/lib/products'
import { useCart } from '@/lib/cart'
import { Plus, Check, Filter } from 'lucide-react'

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [addedItems, setAddedItems] = useState<number[]>([])
  const { addItem } = useCart()

  const filteredProducts = PRODUCTS.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleAddToCart = (product: typeof PRODUCTS[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
    setAddedItems(prev => [...prev, product.id])
    setTimeout(() => {
      setAddedItems(prev => prev.filter(id => id !== product.id))
    }, 2000)
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Premium Digital Downloads
          </h1>
          <p className="text-xl text-green-100 mb-2">
            Instant downloads • Lifetime access • Professionally designed
          </p>
          <p className="text-3xl font-bold text-white">
            All products just £6 each!
          </p>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-8 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 rounded-xl border border-slate-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
              />
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <span>{filteredProducts.length} products</span>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex gap-2 mt-6 overflow-x-auto pb-2 scrollbar-hide">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-green-500 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all group"
              >
                {/* Product Image/Icon */}
                <div className="h-40 bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center relative overflow-hidden">
                  <span className="text-6xl group-hover:scale-110 transition-transform">
                    {product.image}
                  </span>
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 bg-white text-slate-700 text-sm font-semibold rounded-full shadow-sm">
                      £{product.price}
                    </span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-5">
                  <span className="text-xs font-medium text-green-600 uppercase tracking-wide">
                    {product.category}
                  </span>
                  <h3 className="text-lg font-semibold text-slate-900 mt-1 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-slate-500 line-clamp-2 mb-4">
                    {product.description}
                  </p>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={addedItems.includes(product.id)}
                    className={`w-full py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                      addedItems.includes(product.id)
                        ? 'bg-green-100 text-green-700'
                        : 'bg-green-500 text-white hover:bg-green-600'
                    }`}
                  >
                    {addedItems.includes(product.id) ? (
                      <>
                        <Check className="w-5 h-5" />
                        Added!
                      </>
                    ) : (
                      <>
                        <Plus className="w-5 h-5" />
                        Add to Cart
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-slate-500">No products found matching your search.</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-xl font-bold mb-2">DigitalStore</h3>
          <p className="text-slate-400 mb-6">Premium digital downloads for everyone</p>
          <div className="flex justify-center gap-8 text-sm text-slate-400">
            <span>Secure payments via Stripe</span>
            <span>•</span>
            <span>Instant download</span>
            <span>•</span>
            <span>Lifetime access</span>
          </div>
          <p className="text-slate-500 text-sm mt-8">
            © 2026 DigitalStore. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  )
}
