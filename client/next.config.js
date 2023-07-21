/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'dummyimage.com', 'via.placeholder.com'],
  }
}

module.exports = nextConfig
