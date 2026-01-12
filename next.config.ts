import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/shared/i18n/request.ts");

const nextConfig: NextConfig = {
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
        destination: "http://89.124.73.183:8605/:path*",
      },
    ];
  },
};

export default withNextIntl(nextConfig);
