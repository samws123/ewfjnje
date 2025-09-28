/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['api.builder.io', 'pexels.com'],
    unoptimized: true
  }
}

module.exports = nextConfig