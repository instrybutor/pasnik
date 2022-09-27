import { Controller, Get } from '@nestjs/common';
import { CurrentWorkspace } from '../workspaces/current-workspace.decorator';
import { WorkspaceEntity } from '@pasnik/nestjs/database';
import { PaymentsService } from './payments.service';

@Controller('workspaces/:workspaceSlug/payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}
  @Get('/')
  findAll(@CurrentWorkspace() workspace: WorkspaceEntity) {
    return this.paymentsService.findAllInWorkspace(workspace);
  }
}
