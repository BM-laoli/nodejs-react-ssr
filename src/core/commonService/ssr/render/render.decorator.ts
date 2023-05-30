import { applyDecorators } from '@nestjs/common';
import { PageReactContent } from '../../types';

export const RenderReact = (pageContent: PageReactContent) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return applyDecorators((controller: any, router: string) => {
    // 加上一个属性 标记这个是一个组件 注意它只能为
    controller.Components = {
      [`/${router}`]: pageContent,
      ...controller.Components,
    };
  });
};
