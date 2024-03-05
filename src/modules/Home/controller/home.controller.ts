import { Controller, Get, Res, UseInterceptors } from '@nestjs/common';
import { HomeService } from '../service/home.service';
import { RenderReact, RenderInterceptor } from '@/core/commonService';
import Home from '../home.view';

@Controller('home')
@UseInterceptors(RenderInterceptor)
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  private buildLinks() {
    return [
      '/static/css/layout/layout.css',
      '/static/css/components/button.css',
      '/static/css/pages/home.css',
    ];
  }

  @Get('')
  @RenderReact(Home)
  home() {
    return {
      initState: {
        value: 'What is 666 ?',
        valuvlaue: {
          xrrr: {
            a: 1,
          },
        },
      },
      pageInfo: {
        title: 'title - test',
        description: 'description - test',
      },
      links: this.buildLinks(),
    };
  }
}
