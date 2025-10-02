/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.apartments.com',
      },
      {
        protocol: 'https',
        hostname: 'images1.apartments.com',
      },
    ],
  },
}

module.exports = nextConfig
