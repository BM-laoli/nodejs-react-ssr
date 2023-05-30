import { resolve } from 'path';
import { BootstrapModuleFactory, bootstrap } from './core';
import { HomeModule } from './modules/Home/home.module';

const bootstrapModule = BootstrapModuleFactory.create([HomeModule]);

bootstrap(bootstrapModule, {
  root: __dirname,
});
