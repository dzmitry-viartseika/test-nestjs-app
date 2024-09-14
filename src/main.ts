import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  app.setGlobalPrefix(config.get('HTTP_PREFIX'));
  await app.listen(config.get('HTTP_PORT'));

}
bootstrap();
