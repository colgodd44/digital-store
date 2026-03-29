/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove 'export' to enable Vercel serverless functions for Stripe
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
