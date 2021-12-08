import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';
import slugify from 'slugify';
import { nanoid } from 'nanoid';

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
          {
            name: 'privacy',
            type: 'character varying',
          },
          {
            name: 'slug',
            type: 'character varying',
            isUnique: true,
          },
        ],
      })
    );

    await queryRunner.createTable(
      new Table({
        name: 'workspace_user_entity',
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
            name: 'role',
            type: 'character varying',
            default: "'user'",
          },
          {
            name: 'workspaceId',
            type: 'integer',
          },
          {
            name: 'userId',
            type: 'integer',
          },
          {
            name: 'addedById',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'isRemoved',
            type: 'boolean',
            default: 'false',
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
        uniques: [
          {
            columnNames: ['workspaceId', 'userId'],
          },
        ],
      })
    );

    const slug = slugify(['Instrybutor', nanoid(6)].join(' '), {
      lower: true,
    });

    await queryRunner.query(
      `INSERT INTO workspace_entity("name", "privacy", "slug") VALUES('Instrybutor', 'public', '${slug}');`
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
    const workspaceUserTable = await queryRunner.getTable(
      'workspace_user_entity'
    );
    await queryRunner.dropForeignKeys(
      workspaceUserTable,
      workspaceUserTable.foreignKeys
    );

    await queryRunner.dropColumn('order_entity', 'workspaceId');
    await queryRunner.dropColumn('user_entity', 'currentWorkspaceId');
    await queryRunner.dropTable(workspaceUserTable);
    await queryRunner.dropTable(await queryRunner.getTable('workspace_entity'));
  }
}
