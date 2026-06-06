import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// =============================================================================
// DatabaseModule — Global Prisma Module
// =============================================================================
// Marked as @Global() so PrismaService can be injected anywhere
// without re-importing DatabaseModule in each feature module.
// =============================================================================

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class DatabaseModule {}
