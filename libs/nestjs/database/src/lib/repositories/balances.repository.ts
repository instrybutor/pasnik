import { EntityRepository, Repository } from 'typeorm';
import { BalanceEntity } from '../entities/balance.entity';

@EntityRepository(BalanceEntity)
export class BalancesRepository extends Repository<BalanceEntity> {
  async addAmount(workspaceUserId: number, amount: number) {
    const balance =
      (await this.findOne({ where: { workspaceUserId } })) ??
      new BalanceEntity();

    balance.workspaceUserId = workspaceUserId;
    balance.balanceCents = (balance.balanceCents ?? 0) + amount;

    return await this.save(balance);
  }
}
