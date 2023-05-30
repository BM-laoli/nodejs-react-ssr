import { Module } from '@nestjs/common';
import { HomeController } from './controller/home.controller';
import { HomeService } from './service/home.service';

@Module({
  imports: [],
  controllers: [HomeController],
  providers: [HomeService],
})
export class HomeModule {}
