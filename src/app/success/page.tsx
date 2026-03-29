'use client'

import Link from 'next/link'
import { CheckCircle, Download, Mail, ArrowRight } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function SuccessContent() {
  const searchParams = useSearchParams()
  const isDemo = searchParams.get('demo') === 'true'

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-lg text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>

        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          Payment Successful!
        </h1>
        <p className="text-slate-600 mb-6">
          Thank you for your purchase. Your digital downloads are ready.
        </p>

        {isDemo ? (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
            <p className="text-amber-800 text-sm">
              <strong>Demo Mode:</strong> In production, your download links would be sent to your email.
            </p>
          </div>
        ) : (
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl">
              <Mail className="w-5 h-5 text-slate-600" />
              <div className="text-left">
                <p className="text-sm font-medium text-slate-900">Check your email</p>
                <p className="text-xs text-slate-500">Download links sent to your inbox</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl">
              <Download className="w-5 h-5 text-slate-600" />
              <div className="text-left">
                <p className="text-sm font-medium text-slate-900">Download your files</p>
                <p className="text-xs text-slate-500">Access anytime from your email</p>
              </div>
            </div>
          </div>
        )}

        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors"
        >
          Continue Shopping
          <ArrowRight className="w-5 h-5" />
        </Link>

        <p className="text-xs text-slate-500 mt-6">
          Questions? Contact support@digitalstore.com
        </p>
      </div>
    </main>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p>Loading...</p>
      </main>
    }>
      <SuccessContent />
    </Suspense>
  )
}
