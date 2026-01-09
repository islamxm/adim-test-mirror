import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { protocol: "http", hostname: "193.47.42.164", port: "8605" },
      { protocol: "http", hostname: "**" },
    ],
  },
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: "/video-proxy/:path*",
        destination: "http://89.124.73.183:8605/:path*", // Куда шлем запрос
      },
    ];
  },
};

export default nextConfig;
