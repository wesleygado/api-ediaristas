import { MigrationInterface, QueryRunner } from 'typeorm';

export class teste1660073279457 implements MigrationInterface {
  name = 'teste1660073279457';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`password_reset\` ADD \`teste\` varchar(255) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`password_reset\` DROP COLUMN \`teste\``,
    );
  }
}
