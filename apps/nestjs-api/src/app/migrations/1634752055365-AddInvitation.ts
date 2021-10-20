import {MigrationInterface, QueryRunner} from "typeorm";

export class AddInvitation1634752055365 implements MigrationInterface {
    name = 'AddInvitation1634752055365'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "invitation_entity" ("email" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "status" character varying NOT NULL, "acceptedById" integer, "userId" integer, CONSTRAINT "PK_fb6c8a09b61a03ac00753ca86ad" PRIMARY KEY ("email"))`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "isAdmin" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "invitation_entity" ADD CONSTRAINT "FK_42da6a5be3b05f5910df65fd1c7" FOREIGN KEY ("acceptedById") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "invitation_entity" ADD CONSTRAINT "FK_d87712458657a11e7b90d9e9faa" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invitation_entity" DROP CONSTRAINT "FK_d87712458657a11e7b90d9e9faa"`);
        await queryRunner.query(`ALTER TABLE "invitation_entity" DROP CONSTRAINT "FK_42da6a5be3b05f5910df65fd1c7"`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "isAdmin"`);
        await queryRunner.query(`DROP TABLE "invitation_entity"`);
    }

}
