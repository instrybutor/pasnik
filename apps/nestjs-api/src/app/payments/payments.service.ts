import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  OperationEntity,
  PaymentEntity,
  PaymentsRepository,
  WorkspaceEntity,
  WorkspaceUserEntity,
} from '@pasnik/nestjs/database';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(PaymentsRepository)
    private paymentsRepository: PaymentsRepository
  ) {}

  findAllInWorkspace(workspace: WorkspaceEntity): Promise<PaymentEntity[]> {
    return this.paymentsRepository.find({ where: { workspace } });
  }

  findAllForSource(operation: OperationEntity) {
    return this.paymentsRepository.find({ where: { operation } });
  }

  createPayment(
    payer: WorkspaceUserEntity,
    amountCents: number,
    operation: OperationEntity
  ) {
    return this.paymentsRepository.createPayment(
      payer.id,
      amountCents,
      operation
    );
  }
}
