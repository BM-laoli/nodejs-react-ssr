import { Controller, Get, Res, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { RenderReact } from './share/render/render.decorator';
import { RenderInterceptor } from './share/render/render.interceptor';
import About from './page/about';
import Home from './page/home';
import { Response } from 'express';

@Controller()
@UseInterceptors(RenderInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  homeM(@Res() res: Response) {
    res.redirect('/home');
  }

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

  @Get('/about')
  @RenderReact(About)
  about() {
    return {
      name: 'about',
      message: '',
      list: [],
      data: '',
    };
  }
}
