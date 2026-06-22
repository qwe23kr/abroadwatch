import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  async rewrites() {
    return [
      {
        source: "/:traveler(kr|cn|us|jp|tw|au|gb|ca|th|vn)",
        destination: "/guide/:traveler",
      },
      {
        source: "/:traveler(kr|cn|us|jp|tw|au|gb|ca|th|vn)/:path*",
        destination: "/guide/:traveler/:path*",
      },
    ];
  },
};

export default nextConfig;
