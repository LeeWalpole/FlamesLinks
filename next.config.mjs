/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
      },
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
      },

      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
      {
        protocol: "https",
        hostname: "bubblybeaks.com",
      },
      {
        protocol: "https",
        hostname: "jsonplaceholder.typicode.com",
      },
    ],
  },

  experimental: {
    appDir: true,
  },
}

export default nextConfig
