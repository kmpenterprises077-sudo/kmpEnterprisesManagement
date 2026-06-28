import express from 'express';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from '../src/app.module';

const expressApp = express();
let bootstrapPromise: Promise<void> | undefined;

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
  );

  app.enableCors({
    origin: process.env.CORS_ORIGIN?.trim() || 'http://localhost:5173',
    credentials: true,
  });

  await app.init();
}

export default async function handler(req: any, res: any) {
  try {
    bootstrapPromise ||= bootstrap();
    await bootstrapPromise;
    return expressApp(req, res);
  } catch (error) {
    bootstrapPromise = undefined;
    console.error('Nest bootstrap failed', error);
    return res.status(500).json({
      message: 'Server failed to start. Check Vercel function logs.',
    });
  }
}
