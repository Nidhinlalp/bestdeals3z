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

  images: {
    remotePatterns: [
      // TODO: Add Cloudflare R2 public URL when configured
    ],
  },
};

export default nextConfig;
