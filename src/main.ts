import { BootstrapModuleFactory, bootstrap } from './core';
import { HomeModule } from './modules/Home/home.module';

const bootstrapModule = BootstrapModuleFactory.create([HomeModule]);

bootstrap(bootstrapModule, {
  rootDir: __dirname,
});
