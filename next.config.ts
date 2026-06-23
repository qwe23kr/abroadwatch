import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  async redirects() {
    return [
      {
        source: "/ko",
        destination: "/kr",
        permanent: true,
      },
      {
        source: "/en",
        destination: "/us",
        permanent: true,
      },
      {
        source: "/ko/:country/:city/:incident",
        destination: "/kr/:country/:city/:incident",
        permanent: true,
      },
      {
        source: "/en/:country/:city/:incident",
        destination: "/us/:country/:city/:incident",
        permanent: true,
      },
    ];
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
