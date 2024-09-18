import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './module/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './module/database/database.module';
import { UserService } from './module/user/user.service';
import { UserRepository } from './module/user/user.repository';

@Module({
  imports: [UserModule, ConfigModule.forRoot(), DatabaseModule],
  controllers: [AppController],
  providers: [AppService, UserService, UserRepository],
})
export class AppModule {}
