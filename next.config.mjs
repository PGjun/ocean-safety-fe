/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'jdi-global.com',
        port: '27777',
        pathname: '**',
      },
    ],
  },
}

export default nextConfig
