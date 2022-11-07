import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';
import { createServer as createViteServer } from 'vite';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.useStaticAssets(join(__dirname, '..', 'client'));

  // Vite 中间，为了能在其他的ctx 访问 , viteServer 实例
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });

  app.use((req, res, next) => {
    req['viteServer'] = vite;
    next();
  });

  app.use(vite.middlewares);

  // 这样就能够选择正确的东西了
  await app.listen(3000);
}
bootstrap();
