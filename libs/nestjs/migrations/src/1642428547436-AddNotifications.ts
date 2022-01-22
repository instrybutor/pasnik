import {MigrationInterface, QueryRunner} from "typeorm";

export class AddNotifications1642428547436 implements MigrationInterface {
    name = 'AddNotifications1642428547436'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "notification_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "action" text NOT NULL, "data" jsonb, CONSTRAINT "PK_112676de71a3a708b914daed289" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "notification_entity_users_user_entity" ("notificationEntityId" uuid NOT NULL, "userEntityId" integer NOT NULL, CONSTRAINT "PK_d4c775c32f9d7bf1cf055fd599d" PRIMARY KEY ("notificationEntityId", "userEntityId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9f632c101dec279cd3ccf65f50" ON "notification_entity_users_user_entity" ("notificationEntityId") `);
        await queryRunner.query(`CREATE INDEX "IDX_2e7fe69bb591eeb6108dc49577" ON "notification_entity_users_user_entity" ("userEntityId") `);
        await queryRunner.query(`ALTER TABLE "notification_entity_users_user_entity" ADD CONSTRAINT "FK_9f632c101dec279cd3ccf65f508" FOREIGN KEY ("notificationEntityId") REFERENCES "notification_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "notification_entity_users_user_entity" ADD CONSTRAINT "FK_2e7fe69bb591eeb6108dc495771" FOREIGN KEY ("userEntityId") REFERENCES "user_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notification_entity_users_user_entity" DROP CONSTRAINT "FK_2e7fe69bb591eeb6108dc495771"`);
        await queryRunner.query(`ALTER TABLE "notification_entity_users_user_entity" DROP CONSTRAINT "FK_9f632c101dec279cd3ccf65f508"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2e7fe69bb591eeb6108dc49577"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9f632c101dec279cd3ccf65f50"`);
        await queryRunner.query(`DROP TABLE "notification_entity_users_user_entity"`);
        await queryRunner.query(`DROP TABLE "notification_entity"`);
    }

}
