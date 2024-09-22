import { Module } from '@nestjs/common';
import { UserModule } from './module/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './module/database/database.module';

@Module({
  imports: [UserModule, ConfigModule.forRoot(), DatabaseModule],
})
export class AppModule {}
