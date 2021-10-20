import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from 'typeorm';

export class RemoveUserDish1634654311660 implements MigrationInterface {
    name = 'RemoveUserDish1634654311660'

    public async up(queryRunner: QueryRunner): Promise<void> {
      const dishTable = await queryRunner.getTable('dish_entity');

      await queryRunner.addColumn(dishTable, new TableColumn({
        name: 'userId',
        type: "integer",
        isNullable: true,
      }));

      await queryRunner.createForeignKey(dishTable, new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user_entity',
        onDelete: 'SET NULL'
      }));

      await queryRunner.query(`
        UPDATE dish_entity
        SET "userId" = user_dish_entity."userId"
        FROM user_dish_entity
        WHERE user_dish_entity."dishId" = dish_entity.id
      `);

      const userIdColumn = dishTable.findColumnByName('userId');
      const changedUserIdColumn = userIdColumn.clone();
      changedUserIdColumn.isNullable = false;
      await queryRunner.changeColumn('dish_entity', userIdColumn, changedUserIdColumn);

      await queryRunner.dropTable('user_dish_entity');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: 'user_dish_entity',
        columns: [
          {
            name: 'userId',
            type: "integer",
            isNullable: false,
            isPrimary: true
          },
          {
            name: 'dishId',
            type: "integer",
            isNullable: false,
            isPrimary: true
          },
          {
            name: 'dishOwner',
            type: "boolean",
            isNullable: false,
            default: true
          }
        ],
        foreignKeys: [
          {
            columnNames: ["userId"],
            referencedColumnNames: ["id"],
            referencedTableName: "user_entity",
            onDelete: 'SET NULL'
          },
          {
            columnNames: ["dishId"],
            referencedColumnNames: ["id"],
            referencedTableName: "dish_entity",
            onDelete: 'CASCADE'
          }
        ]
      }));

      await queryRunner.query(`
        INSERT INTO user_dish_entity ("dishId", "userId", "dishOwner") (
          SELECT
            d.id,
            d."userId",
            'true'
          FROM dish_entity d
        )
      `)

      const dishTable = await queryRunner.getTable("dish_entity");
      const foreignKey = dishTable.foreignKeys.find(fk => fk.columnNames.indexOf("userId") !== -1);
      await queryRunner.dropForeignKey(dishTable, foreignKey);
      await queryRunner.dropColumn(dishTable, 'userId');
    }
}
