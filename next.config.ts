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
      {
        source: "/ko/:country",
        destination: "/kr/:country",
        permanent: true,
      },
      {
        source: "/en/:country",
        destination: "/us/:country",
        permanent: true,
      },
      {
        source: "/ko/:country/:city",
        destination: "/kr/:country/:city",
        permanent: true,
      },
      {
        source: "/en/:country/:city",
        destination: "/us/:country/:city",
        permanent: true,
      },
      {
        source: "/guide/:traveler(kr|cn|us|jp|tw|au|gb|ca|th|vn)",
        destination: "/:traveler",
        permanent: true,
      },
      {
        source: "/guide/:traveler(kr|cn|us|jp|tw|au|gb|ca|th|vn)/search",
        destination: "/:traveler/search",
        permanent: true,
      },
      {
        source: "/guide/:traveler(kr|cn|us|jp|tw|au|gb|ca|th|vn)/:country",
        destination: "/:traveler/:country",
        permanent: true,
      },
      {
        source: "/guide/:traveler(kr|cn|us|jp|tw|au|gb|ca|th|vn)/:country/:city",
        destination: "/:traveler/:country/:city",
        permanent: true,
      },
      {
        source: "/guide/kr/:country/:city/:incident",
        destination: "/kr/:country/:city/:incident",
        permanent: true,
      },
      {
        source: "/guide/us/:country/:city/:incident",
        destination: "/us/:country/:city/:incident",
        permanent: true,
      },
      {
        source: "/guide/cn/:country/:city/:incident",
        destination: "/cn/:country/:city/:incident",
        permanent: true,
      },
      {
        source: "/guide/jp/:country/:city/:incident",
        destination: "/jp/:country/:city/:incident",
        permanent: true,
      },
      {
        source: "/guide/tw/:country/:city/:incident",
        destination: "/tw/:country/:city/:incident",
        permanent: true,
      },
      {
        source: "/guide/au/:country/:city/:incident",
        destination: "/au/:country/:city/:incident",
        permanent: true,
      },
      {
        source: "/guide/gb/:country/:city/:incident",
        destination: "/gb/:country/:city/:incident",
        permanent: true,
      },
      {
        source: "/guide/ca/:country/:city/:incident",
        destination: "/ca/:country/:city/:incident",
        permanent: true,
      },
      {
        source: "/guide/th/:country/:city/:incident",
        destination: "/th/:country/:city/:incident",
        permanent: true,
      },
      {
        source: "/guide/vn/:country/:city/:incident",
        destination: "/vn/:country/:city/:incident",
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
