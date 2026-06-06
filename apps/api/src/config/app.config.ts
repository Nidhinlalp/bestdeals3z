// =============================================================================
// App Configuration
// =============================================================================
// Typed configuration loaded by ConfigModule.
// Access via: this.configService.get<string>('database.url')
// =============================================================================

import { registerAs } from '@nestjs/config';

export const appConfig = registerAs('app', () => ({
  nodeEnv: process.env['NODE_ENV'] ?? 'development',
  port: parseInt(process.env['PORT'] ?? '3333', 10),
  apiPrefix: 'api/v1',
}));

export const databaseConfig = registerAs('database', () => ({
  url: process.env['DATABASE_URL'],
}));

export const jwtConfig = registerAs('jwt', () => ({
  secret: process.env['JWT_SECRET'],
  expiresIn: process.env['JWT_EXPIRES_IN'] ?? '7d',
}));

export const cloudflareConfig = registerAs('cloudflare', () => ({
  accountId: process.env['CLOUDFLARE_ACCOUNT_ID'],
  r2Bucket: process.env['CLOUDFLARE_R2_BUCKET'],
  r2AccessKey: process.env['CLOUDFLARE_R2_ACCESS_KEY'],
  r2SecretKey: process.env['CLOUDFLARE_R2_SECRET_KEY'],
  r2PublicUrl: process.env['CLOUDFLARE_R2_PUBLIC_URL'],
}));
