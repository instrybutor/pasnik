import {MigrationInterface, QueryRunner} from "typeorm";

export class AddInvitation1634833405835 implements MigrationInterface {
    name = 'AddInvitation1634833405835'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "invitation_entity" ("email" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "status" character varying NOT NULL, "changedById" integer, "userId" integer, CONSTRAINT "PK_fb6c8a09b61a03ac00753ca86ad" PRIMARY KEY ("email"))`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "isAdmin" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "invitation_entity" ADD CONSTRAINT "FK_40a2d20a2648d6cfe05108b98e5" FOREIGN KEY ("changedById") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "invitation_entity" ADD CONSTRAINT "FK_d87712458657a11e7b90d9e9faa" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invitation_entity" DROP CONSTRAINT "FK_d87712458657a11e7b90d9e9faa"`);
        await queryRunner.query(`ALTER TABLE "invitation_entity" DROP CONSTRAINT "FK_40a2d20a2648d6cfe05108b98e5"`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "isAdmin"`);
        await queryRunner.query(`DROP TABLE "invitation_entity"`);
    }

}
