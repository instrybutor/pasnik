import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import {
  UserEntity,
  UsersRepository,
  WorkspaceUsersRepository,
} from '@pasnik/nestjs/database';

interface WorkspacesParams {
  slug: string;
}

@Injectable()
export class WorkspaceMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(WorkspaceUsersRepository)
    private readonly workspaceUsersRepository: WorkspaceUsersRepository,
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository
  ) {}
  async use(req: Request<WorkspacesParams>, res: Response, next: NextFunction) {
    const user = req.user as UserEntity;
    const { slug } = req.params;
    const workspaceUser = await this.workspaceUsersRepository.findOne({
      where: {
        workspace: {
          slug,
        },
        user,
      },
      relations: ['workspace'],
    });

    if (
      workspaceUser &&
      user.currentWorkspaceId !== workspaceUser.workspaceId
    ) {
      await this.usersRepository.update(user.id, {
        currentWorkspaceId: workspaceUser.workspaceId,
      });
    }
    next();
  }
}
