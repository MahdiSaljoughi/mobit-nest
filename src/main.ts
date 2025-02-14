import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:3000', 'https://moobit.vercel.app'],
  });

  await app.listen(process.env.NEST_PORT ?? 5555);
}
bootstrap();
