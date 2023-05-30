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
  onModuleInit() {
    console.log('22');
  }
}

export interface IBootstrapOptions {
  rootDir?: string;
  globalFilters?: ExceptionFilter[];
}
async function bootstrap(module: DynamicModule, options: IBootstrapOptions) {
  const app = await NestFactory.create<NestExpressApplication>(module);
  const vite = await createViteServer({
    server: {
      middlewareMode: true,
    },
    appType: 'custom',
  });
  app.use((req, res, next) => {
    req['viteServer'] = vite;
    next();
  });
  app.use(vite.middlewares);
  await app.listen(3000);
}

export { bootstrap };
