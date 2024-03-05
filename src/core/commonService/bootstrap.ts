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
import { ExceptionFilter } from '@nestjs/common';
import { routers, InterRouter } from '../../../conf/router';
import { join } from 'path';

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
  app.useStaticAssets(join(__dirname, '../../../', 'webSource'), {
    prefix: '/webSource',
  });
  app.useStaticAssets(join(__dirname, '../../../', 'static'), {
    prefix: '/static',
  });

  await app.listen(3000);
}
export { bootstrap };
