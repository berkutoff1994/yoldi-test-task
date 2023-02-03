/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'frontend-test-api.yoldi.agency',
        port: '',
        pathname: '/api/image/src/**',
      },
    ],
  },
}

module.exports = nextConfig
