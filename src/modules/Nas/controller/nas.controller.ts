import { Controller, Get, Res, UseInterceptors } from '@nestjs/common';
import { RenderReact, RenderInterceptor } from '../../../core/commonService';
import Nas from '../nas.view';

@Controller('nas')
@UseInterceptors(RenderInterceptor)
export class NasController {
  private buildLinks() {
    return [
      '/static/css/layout/layout.css',
      '/static/css/components/button.css',
      '/static/css/pages/home.css',
    ];
  }

  @Get('')
  @RenderReact(Nas)
  home() {
    return {
      initState: {},
      pageInfo: {
        title: 'title - test',
        description: 'description - test',
      },
      links: this.buildLinks(),
    };
  }
}
