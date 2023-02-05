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
  async redirects() {
    return [
      {
        source: '/',
        destination: '/accounts',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
