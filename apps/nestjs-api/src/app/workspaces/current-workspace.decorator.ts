import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity, WorkspaceEntity } from '@pasnik/nestjs/database';

export const CurrentWorkspace = createParamDecorator<WorkspaceEntity>(
  (data: unknown, ctx: ExecutionContext): UserEntity => {
    const response = ctx.switchToHttp().getResponse();
    return response.locals.workspace;
  }
);
