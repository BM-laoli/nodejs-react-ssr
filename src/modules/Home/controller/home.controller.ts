import { Controller, Get, Res, UseInterceptors } from '@nestjs/common';
import { HomeService } from '../service/home.service';
import { RenderReact, RenderInterceptor } from "../../../core/commonService"
import Home from '../home.view';
import { Response } from 'express';

@Controller()
@UseInterceptors(RenderInterceptor)
export class HomeController {
  constructor(private readonly homeService: HomeService) {}


  @Get('/home')
  @RenderReact(Home)
  home() {
    return {
      name: '',
      message: '',
      list: [],
      data: '',
    };
  }

}
