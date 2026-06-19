import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  async rewrites() {
    return [
      {
        source: "/:traveler(kr|cn|us|jp|tw|au|gb|ca)",
        destination: "/guide/:traveler",
      },
      {
        source: "/:traveler(kr|cn|us|jp|tw|au|gb|ca)/:path*",
        destination: "/guide/:traveler/:path*",
      },
    ];
  },
};

export default nextConfig;
