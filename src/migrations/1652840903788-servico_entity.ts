import { MigrationInterface, QueryRunner } from 'typeorm';

export class servicoEntity1652840903788 implements MigrationInterface {
  name = 'servicoEntity1652840903788';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`diaria\` CHANGE \`servico\` \`servico_id\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`diaria\` ADD CONSTRAINT \`FK_5e1094dcfc8b8eff8ed9602bdb2\` FOREIGN KEY (\`servico_id\`) REFERENCES \`servico\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`diaria\` DROP FOREIGN KEY \`FK_5e1094dcfc8b8eff8ed9602bdb2\``,
    );
  }
}
