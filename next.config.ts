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
};

export default nextConfig;
