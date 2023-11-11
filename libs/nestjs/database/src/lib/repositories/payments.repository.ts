import { EntityRepository, Repository } from 'typeorm';
import { OperationEntity, PaymentEntity } from '@pasnik/nestjs/database';

@EntityRepository(PaymentEntity)
export class PaymentsRepository extends Repository<PaymentEntity> {
  async upsertPayment(
    workspaceUserId: number,
    amountCents: number,
    operation: OperationEntity
  ) {
    const payment =
      (await this.findOne({ where: { operation, workspaceUserId } })) ??
      new PaymentEntity();

    payment.workspaceUserId = workspaceUserId;
    payment.amountCents = amountCents;
    payment.operation = operation;

    return await this.save(payment);
  }

  async createPayment(
    workspaceUserId: number,
    amountCents: number,
    operation: OperationEntity
  ) {
    const payment = new PaymentEntity();

    payment.workspaceUserId = workspaceUserId;
    payment.amountCents = amountCents;
    payment.operation = operation;

    return await this.save(payment);
  }
}
