import {
  DynamicModule,
  Global,
  Module,
  OnModuleInit,
  Type,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { castArray } from 'lodash';
import { createServer as createViteServer } from 'vite';
import { ExceptionFilter } from '@nestjs/common';

export class BootstrapModuleFactory {
  public static create(_module: Type<any> | Array<Type<any>>): DynamicModule {
    return {
      module: BootstrapModule,
      imports: [
        ConfigModule.forRoot({
          load: [],
        }) as any,
        ...castArray(_module),
      ],
    };
  }
}

@Global()
@Module({
  providers: [],
  controllers: [],
  exports: [ConfigModule],
})
class BootstrapModule implements OnModuleInit {
  onModuleInit() {}
}

export interface IBootstrapOptions {
  rootDir?: string;
  globalFilters?: ExceptionFilter[];
}
async function bootstrap(module: DynamicModule, options: IBootstrapOptions) {
  const app = await NestFactory.create<NestExpressApplication>(module);

  app.useStaticAssets(options.rootDir);

  // Vite 中间，为了能在其他的ctx 访问 , viteServer 实例
  const vite = await createViteServer({
    server: {
      middlewareMode: true,
      base: '/public',
    },
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

export { bootstrap };
