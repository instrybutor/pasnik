import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeOrderAction1638827204582 implements MigrationInterface {
    name = 'ChangeOrderAction1638827204582'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_action_entity" DROP CONSTRAINT "FK_ec8e7631f303b82f09e24482045"`);
        await queryRunner.query(`ALTER TABLE "order_action_entity" DROP CONSTRAINT "FK_d72fff3a01e856b40fa8ad4d445"`);
        await queryRunner.query(`ALTER TABLE "order_action_entity" ADD CONSTRAINT "FK_d72fff3a01e856b40fa8ad4d445" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_action_entity" ADD CONSTRAINT "FK_ec8e7631f303b82f09e24482045" FOREIGN KEY ("orderId") REFERENCES "order_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_action_entity" DROP CONSTRAINT "FK_ec8e7631f303b82f09e24482045"`);
        await queryRunner.query(`ALTER TABLE "order_action_entity" DROP CONSTRAINT "FK_d72fff3a01e856b40fa8ad4d445"`);
        await queryRunner.query(`ALTER TABLE "order_action_entity" ADD CONSTRAINT "FK_d72fff3a01e856b40fa8ad4d445" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_action_entity" ADD CONSTRAINT "FK_ec8e7631f303b82f09e24482045" FOREIGN KEY ("orderId") REFERENCES "order_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
