import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';

// =============================================================================
// AppModule — Root Module
// =============================================================================
// Feature modules will be imported here as they are built.
// Pattern: import { ProductsModule } from './modules/products/products.module';
// =============================================================================

@Module({
  imports: [
    // Configuration module (makes process.env typed and validated)
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),

    // Database module (Prisma)
    DatabaseModule,

    // TODO: Feature modules (add as you build each feature)
    // AuthModule,
    // UsersModule,
    // ProductsModule,
    // CategoriesModule,
    // OrdersModule,
    // CartModule,
    // MediaModule,
    // WhatsAppModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
