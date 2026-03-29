'use client'

import { useState } from 'react'
import { PRODUCTS, CATEGORIES } from '@/lib/products'
import { useCart } from '@/lib/cart'
import { Plus, Check, Filter, X, Eye, FileText, Download, Clock, Star } from 'lucide-react'

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [addedItems, setAddedItems] = useState<number[]>([])
  const [previewFile, setPreviewFile] = useState<typeof PRODUCTS[0] | null>(null)
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
            Premium Digital Files
          </h1>
          <p className="text-xl text-green-100 mb-2">
            Instant Download • PDF Guides • Templates • eBooks
          </p>
          <p className="text-3xl font-bold text-white">
            All files just £6 each!
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
                placeholder="Search files..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 rounded-xl border border-slate-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
              />
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <span>{filteredProducts.length} files</span>
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

                  {/* Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => setPreviewFile(product)}
                      className="flex-1 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 bg-slate-100 text-slate-700 hover:bg-slate-200"
                    >
                      <Eye className="w-5 h-5" />
                      Preview
                    </button>
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={addedItems.includes(product.id)}
                      className={`flex-1 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
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
                          Add
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-slate-500">No files found matching your search.</p>
            </div>
          )}
        </div>
      </section>

      {/* Preview Modal */}
      {previewFile && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white p-6 border-b border-slate-100 flex items-center justify-between">
              <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                {previewFile.category}
              </span>
              <button
                onClick={() => setPreviewFile(null)}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-slate-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* File Preview */}
              <div className="h-48 bg-gradient-to-br from-slate-100 to-slate-50 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-8xl">{previewFile.image}</span>
              </div>

              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                {previewFile.name}
              </h2>
              <p className="text-3xl font-bold text-green-600 mb-4">£{previewFile.price}</p>

              <p className="text-slate-600 mb-6 leading-relaxed">
                {previewFile.description}
              </p>

              {/* What's Included */}
              <div className="bg-slate-50 rounded-xl p-4 mb-6">
                <h3 className="font-semibold text-slate-900 mb-3">What's Included:</h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-green-500" />
                    PDF format (downloadable)
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-green-500" />
                    Instant download to your email
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-green-500" />
                    Lifetime access
                  </li>
                  <li className="flex items-center gap-2">
                    <Download className="w-4 h-4 text-green-500" />
                    Compatible with all devices
                  </li>
                </ul>
              </div>

              {/* Preview Note */}
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6">
                <p className="text-sm text-blue-700">
                  <strong>Preview:</strong> This is a sample of what you'll receive. The full PDF will be sent to your email after purchase.
                </p>
                <div className="mt-3 text-xs text-blue-600 space-y-1">
                  <p>• Introduction & overview</p>
                  <p>• Table of contents</p>
                  <p>• First 2-3 pages of content</p>
                </div>
              </div>

              {/* Add to Cart */}
              <button
                onClick={() => {
                  handleAddToCart(previewFile)
                  setPreviewFile(null)
                }}
                disabled={addedItems.includes(previewFile.id)}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 ${
                  addedItems.includes(previewFile.id)
                    ? 'bg-green-100 text-green-700'
                    : 'bg-green-500 text-white hover:bg-green-600'
                }`}
              >
                {addedItems.includes(previewFile.id) ? (
                  <>
                    <Check className="w-6 h-6" />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <Plus className="w-6 h-6" />
                    Add to Cart - £{previewFile.price}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-xl font-bold mb-2">Digital Files Store</h3>
          <p className="text-slate-400 mb-6">Premium PDF guides, templates & eBooks</p>
          <div className="flex justify-center gap-8 text-sm text-slate-400">
            <span>Secure payments via Stripe</span>
            <span>•</span>
            <span>Instant download to your email</span>
            <span>•</span>
            <span>Lifetime access</span>
          </div>
          <p className="text-slate-500 text-sm mt-8">
            © 2026 Digital Files Store. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  )
}
