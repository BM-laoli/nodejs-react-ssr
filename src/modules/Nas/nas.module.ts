import { Module } from '@nestjs/common';
import { NasController } from './controller/nas.controller';

@Module({
  imports: [],
  controllers: [NasController],
  providers: [],
})
export class NasModule {}
