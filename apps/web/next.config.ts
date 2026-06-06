import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Transpile internal workspace packages
  transpilePackages: [
    '@ecom/ui',
    '@ecom/types',
    '@ecom/utils',
    '@ecom/validation',
    '@ecom/config',
    '@ecom/constants',
  ],

  // Experimental features
  experimental: {
    // Enable React compiler (Next.js 15)
    // reactCompiler: true,
  },

  // Image configuration
  images: {
    remotePatterns: [
      // TODO: Add Cloudflare R2 public URL when configured
      // {
      //   protocol: 'https',
      //   hostname: 'pub-*.r2.dev',
      // },
    ],
  },
};

export default nextConfig;
