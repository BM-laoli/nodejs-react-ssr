import { SetMetadata } from '@nestjs/common';

export const RenderReact = (pageContent: any) =>
  SetMetadata('ReactComponent', pageContent);
