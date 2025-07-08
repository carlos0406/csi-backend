import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { ZodExceptionFilter } from './nest-modules/common/pipes/zod-validation-filter';

async function bootstrap() {
  console.log('🚀 Bootstrap starting...');

  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  console.log('✅ App created');

  app.enableCors({
    origin: 'http://localhost:3001',
    credentials: true,
  });

  console.log('✅ CORS configured');

  app.use(cookieParser());
  console.log('✅ Cookie parser configured');

  app.useGlobalFilters(new ZodExceptionFilter());
  console.log('✅ Filters configured');

  // Adicionar middleware de debug
  app.use((req, res, next) => {
    console.log(`📥 ${req.method} ${req.url} - ${new Date().toISOString()}`);
    next();
  });

  console.log('🎯 About to listen...');
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
  console.log('🎉 Server is listening!');
}
bootstrap();
