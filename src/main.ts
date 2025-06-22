import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtExceptionFilter } from './auth/jwt-exception.filter'; // Add this import

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 🔍 Log every incoming request
  app.use((req, res, next) => {
    console.log('[MAIN] JWT_SECRET:', process.env.JWT_SECRET);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.log(`[DEBUG] Incoming ${req.method} request to ${req.url}`);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    next();
  });

  // 🔐 Enable CORS
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3001',
    credentials: true,
  });

  app.useGlobalFilters(new JwtExceptionFilter());

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
