import 'dotenv/config';
import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = app.get(ConfigService).get('PORT');
  await app.listen(port);
  console.log(`GraphQL sandbox: http://localhost:${port}/graphql`);
}
bootstrap();
