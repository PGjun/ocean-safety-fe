/** @type {import('next').NextConfig} */
const nextConfig = {
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
