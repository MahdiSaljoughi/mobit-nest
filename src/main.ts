import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://moobit.vercel.app',
      'https://moobit.netlify.app',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  });

  await app.listen(process.env.NEST_PORT ?? 5555);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
