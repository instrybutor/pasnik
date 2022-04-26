import { Request, Response } from 'express';
import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { WorkspaceUsersRepository } from '@pasnik/nestjs/database';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkspacesService } from './workspaces.service';

interface WorkspacesParams {
  workspaceSlug: string;
}

@Injectable()
export class WorkspacesMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(WorkspaceUsersRepository)
    private readonly workspaceUsersRepository: WorkspaceUsersRepository,
    private readonly workspacesService: WorkspacesService
  ) {}
  async use(req: Request<WorkspacesParams>, res: Response, next: () => void) {
    const { user, params } = req;
    const { workspaceSlug } = params;
    const workspace = await this.workspacesService.findOneBySlug(workspaceSlug);

    if (!workspace) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    const workspaceUser = await this.workspaceUsersRepository.findOne({
      where: { workspace, user, isRemoved: false },
      relations: ['user', 'workspace'],
    });

    res.locals.workspaceUser = workspaceUser;
    res.locals.workspace = workspace;

    next();
  }
}
