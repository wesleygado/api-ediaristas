import { MigrationInterface, QueryRunner } from 'typeorm';
export class avaliacao1654538113207 implements MigrationInterface {
  name = 'avaliacao1654538113207';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`avaliacao\` (\`id\` int NOT NULL AUTO_INCREMENT, \`descricao\` varchar(255) NOT NULL, \`nota\` int NOT NULL, \`visibilidade\` tinyint NOT NULL, \`diaria_id\` int NOT NULL, \`avaliador_id\` int NULL, \`avaliado_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`avaliacao\` ADD CONSTRAINT \`FK_35fe0f22d8f10b876d761b1c9e1\` FOREIGN KEY (\`diaria_id\`) REFERENCES \`diaria\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`avaliacao\` ADD CONSTRAINT \`FK_0897024fac4a1655bbf90cc6200\` FOREIGN KEY (\`avaliador_id\`) REFERENCES \`usuario_api\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`avaliacao\` ADD CONSTRAINT \`FK_945ad0f9f6b9e6cff592e7c6e40\` FOREIGN KEY (\`avaliado_id\`) REFERENCES \`usuario_api\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`avaliacao\``);
  }
}
