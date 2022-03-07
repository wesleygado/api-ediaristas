import { MigrationInterface, QueryRunner } from 'typeorm';

export class usuarios1646427760463 implements MigrationInterface {
  name = 'usuarios1646427760463';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`usuario\` ADD \`cpf\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`usuario\` ADD \`nascimento\` datetime NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`usuario\` ADD \`telefone\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`usuario\` ADD \`reputacao\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`usuario\` ADD \`chavePix\` varchar(255) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`usuario\` DROP COLUMN \`chavePix\``);
    await queryRunner.query(
      `ALTER TABLE \`usuario\` DROP COLUMN \`reputacao\``,
    );
    await queryRunner.query(`ALTER TABLE \`usuario\` DROP COLUMN \`telefone\``);
    await queryRunner.query(
      `ALTER TABLE \`usuario\` DROP COLUMN \`nascimento\``,
    );
    await queryRunner.query(`ALTER TABLE \`usuario\` DROP COLUMN \`cpf\``);
  }
}
