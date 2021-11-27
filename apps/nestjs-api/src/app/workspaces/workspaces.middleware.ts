import { Request, Response } from 'express';
import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { WorkspaceUsersRepository } from '@pasnik/nestjs/database';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { InjectRepository } from '@nestjs/typeorm';

interface WorkspacesParams {
  workspaceSlug: string;
}

@Injectable()
export class WorkspacesMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(WorkspaceUsersRepository)
    private readonly workspaceUsersRepository: WorkspaceUsersRepository
  ) {}
  async use(req: Request<WorkspacesParams>, res: Response, next: () => void) {
    const { user, params } = req;
    const { workspaceSlug } = params;
    const workspaceUser = await this.workspaceUsersRepository.findOne({
      where: { workspace: { slug: workspaceSlug }, user },
      relations: ['workspace', 'user'],
    });

    if (!workspaceUser) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    res.locals.workspaceUser = workspaceUser;

    next();
  }
}
