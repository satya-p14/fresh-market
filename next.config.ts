import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  "compilerOptions": {
    "types": ["jest", "node", "@testing-library/jest-dom"]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wallpaperaccess.com',
        pathname: '/full/**',
      },
      {
        protocol: 'https',
        hostname: 'wallpaperaccess.com',
        pathname: '/thumb/**'
      },
    ],
  },
  logging: {

  },
};

export default nextConfig;
