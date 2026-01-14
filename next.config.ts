import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

import withBundleAnalyzer from "@next/bundle-analyzer";

const withNextIntl = createNextIntlPlugin("./src/shared/i18n/request.ts");
const bundleAnalyzer = withBundleAnalyzer({
  enabled: true,
});
const nextConfig: NextConfig = {
  output: "standalone",
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

export default bundleAnalyzer(withNextIntl(nextConfig));
