import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // Enable App Router for Next.js 13+
    appDir: true,
  },
};

export default nextConfig;
