/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['api.builder.io', 'pexels.com'],
    unoptimized: true,
  },
  async rewrites() {
    return [
      { source: '/closedbeta', destination: '/api/nectir-proxy?path=/' },
      { source: '/closedbeta/:path*', destination: '/api/nectir-proxy?path=/:path*' },
    ];
  },
};

module.exports = nextConfig;