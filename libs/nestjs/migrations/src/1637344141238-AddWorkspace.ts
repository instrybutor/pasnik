import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddWorkspace1637344141238 implements MigrationInterface {
  name = 'AddWorkspace1637344141238';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'workspace_entity',
        columns: [
          {
            name: 'id',
            type: 'SERIAL',
            isPrimary: true,
          },
          {
            name: 'createdAt',
            default: 'NOW()',
            type: 'TIMESTAMP',
          },
          {
            name: 'updatedAt',
            default: 'NOW()',
            type: 'TIMESTAMP',
          },
          {
            name: 'name',
            type: 'character varying',
          },
        ],
      })
    );

    await queryRunner.createTable(
      new Table({
        name: 'workspace_user_entity',
        columns: [
          {
            name: 'createdAt',
            default: 'NOW()',
            type: 'TIMESTAMP',
          },
          {
            name: 'role',
            type: 'character varying',
            default: "'user'",
          },
          {
            name: 'workspaceId',
            type: 'integer',
            isPrimary: true,
          },
          {
            name: 'userId',
            type: 'integer',
            isPrimary: true,
          },
          {
            name: 'addedById',
            type: 'integer',
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['userId'],
            referencedTableName: 'user_entity',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['addedById'],
            referencedTableName: 'user_entity',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL',
          },
          {
            columnNames: ['workspaceId'],
            referencedTableName: 'workspace_entity',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
        ],
      })
    );

    await queryRunner.query(
      `INSERT INTO workspace_entity("name") VALUES('Instrybutor');`
    );

    await queryRunner.query(
      `
      INSERT INTO workspace_user_entity ("userId", "workspaceId") (
        SELECT
          u.id,
          1
        FROM user_entity u
      )
    `
    );

    const userTable = await queryRunner.getTable('user_entity');

    await queryRunner.addColumn(
      userTable,
      new TableColumn({
        name: 'currentWorkspaceId',
        type: 'integer',
        isNullable: true,
      })
    );

    await queryRunner.createForeignKey(
      userTable,
      new TableForeignKey({
        columnNames: ['currentWorkspaceId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'workspace_entity',
        onDelete: 'SET NULL',
      })
    );

    await queryRunner.query(`
      UPDATE user_entity
      SET "currentWorkspaceId" = 1;
    `);

    await queryRunner.changeColumn(
      userTable,
      'currentWorkspaceId',
      new TableColumn({
        name: 'currentWorkspaceId',
        type: 'integer',
        isNullable: false,
      })
    );

    const orderTable = await queryRunner.getTable('order_entity');

    await queryRunner.addColumn(
      orderTable,
      new TableColumn({
        name: 'workspaceId',
        type: 'integer',
        isNullable: true,
      })
    );

    await queryRunner.createForeignKey(
      orderTable,
      new TableForeignKey({
        columnNames: ['workspaceId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'workspace_entity',
        onDelete: 'CASCADE',
      })
    );

    await queryRunner.query(`
      UPDATE order_entity
      SET "workspaceId" = 1;
    `);

    await queryRunner.changeColumn(
      orderTable,
      'workspaceId',
      new TableColumn({
        name: 'workspaceId',
        type: 'integer',
        isNullable: false,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // const userTable = await queryRunner.getTable('user_entity');
    // const currentWorkspaceIdFk = userTable.foreignKeys.find((foreignKey) => foreignKey.name === 'currentWorkspaceId');
    // await userTable.removeForeignKey(currentWorkspaceIdFk);

    await queryRunner.dropColumn('order_entity', 'workspaceId');
    await queryRunner.dropColumn('user_entity', 'currentWorkspaceId');
    await queryRunner.dropTable(
      await queryRunner.getTable('workspace_user_entity')
    );
    await queryRunner.dropTable(await queryRunner.getTable('workspace_entity'));

    // await queryRunner.query(
    //   `ALTER TABLE "workspace_user_entity" DROP CONSTRAINT "FK_16f7a599844b98d1cc8bb6f8770"`
    // );
    // await queryRunner.query(
    //   `ALTER TABLE "workspace_user_entity" DROP CONSTRAINT "FK_21822dcace92903a16b390dedb6"`
    // );
    // await queryRunner.query(
    //   `ALTER TABLE "workspace_user_entity" DROP CONSTRAINT "FK_2fed887e85c025ad81f1e858b6b"`
    // );
    // await queryRunner.query(
    //   `ALTER TABLE "user_entity" DROP COLUMN "currentWorkspaceId"`
    // );
    // await queryRunner.query(`DROP TABLE "workspace_entity"`);
    // await queryRunner.query(`DROP TABLE "workspace_user_entity"`);
  }
}
