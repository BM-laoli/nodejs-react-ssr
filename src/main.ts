import { BootstrapModuleFactory, bootstrap } from './core';
import { HomeModule } from './modules/Home/home.module';
import { NasModule } from './modules/Nas/nas.module';

const bootstrapModule = BootstrapModuleFactory.create([HomeModule, NasModule]);

bootstrap(bootstrapModule, {
  rootDir: __dirname,
});
