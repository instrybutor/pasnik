import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { WorkspaceEntity } from '@pasnik/nestjs/database';
import { AppAbility, defineWorkspaceRulesFor } from '@pasnik/ability';

export const CurrentAbility = createParamDecorator<WorkspaceEntity>(
  (data: unknown, ctx: ExecutionContext): AppAbility => {
    const { locals } = ctx.switchToHttp().getResponse();
    const { user } = ctx.switchToHttp().getRequest();
    return defineWorkspaceRulesFor(user, locals.workspaceUser);
  }
);
