import { Request, Response } from 'express';
import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { WorkspaceUsersRepository } from '@pasnik/nestjs/database';
import { HttpException } from '@nestjs/common/exceptions/http.exception';

interface WorkspacesParams {
  workspaceId: string;
}

@Injectable()
export class WorkspaceUserMiddleware implements NestMiddleware {
  constructor(
    private readonly workspaceUsersRepository: WorkspaceUsersRepository
  ) {}
  async use(req: Request<WorkspacesParams>, res: Response, next: () => void) {
    const { user, params } = req;
    const { workspaceId } = params;
    const workspaceUser = await this.workspaceUsersRepository.findOne({
      where: { workspaceId, user },
      relations: ['workspace'],
    });

    if (!workspaceUser) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    res.locals.workspaceUser = workspaceUser;

    next();
  }
}
