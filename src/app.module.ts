import { Module } from '@nestjs/common';
import { UserModule } from './module/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './module/database/database.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, ConfigModule.forRoot(), DatabaseModule, AuthModule],
})
export class AppModule {}
