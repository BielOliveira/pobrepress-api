import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreatePermissions1594071657950
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'permissions',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            generationStrategy: 'increment',
            isGenerated: true,
          },
          {
            name: 'userid',
            type: 'int',
          },
          {
            name: 'blog',
            type: 'varchar',
          },
          {
            name: 'ecommerce',
            type: 'varchar',
          },
          {
            name: 'admin',
            type: 'varchar',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'permissions',
      new TableForeignKey({
        name: 'PermissionUser',
        columnNames: ['userid'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('permissions', 'PermissionUser');

    await queryRunner.dropTable('permissions');
  }
}
