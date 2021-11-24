import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity, WorkspaceUserEntity } from '@pasnik/nestjs/database';

export const CurrentWorkspaceUser = createParamDecorator<WorkspaceUserEntity>(
  (data: unknown, ctx: ExecutionContext): UserEntity => {
    const response = ctx.switchToHttp().getResponse();
    return response.locals.workspaceUser;
  }
);
