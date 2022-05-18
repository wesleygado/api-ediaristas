import { MigrationInterface, QueryRunner } from 'typeorm';

export class candidatura1652224785604 implements MigrationInterface {
  name = 'candidatura1652224785604';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`diaria_candidato\` (\`diaria_id\` int NOT NULL, \`usuario_api_id\` int NOT NULL, INDEX \`IDX_5ee5622ceca5b61dc30dbf5216\` (\`diaria_id\`), INDEX \`IDX_a5ad3322b23d34e8b9571fa6c1\` (\`usuario_api_id\`), PRIMARY KEY (\`diaria_id\`, \`usuario_api_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`diaria_candidato\` ADD CONSTRAINT \`FK_5ee5622ceca5b61dc30dbf52169\` FOREIGN KEY (\`diaria_id\`) REFERENCES \`diaria\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`diaria_candidato\` ADD CONSTRAINT \`FK_a5ad3322b23d34e8b9571fa6c1a\` FOREIGN KEY (\`usuario_api_id\`) REFERENCES \`usuario_api\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`diaria_candidato\` DROP FOREIGN KEY \`FK_a5ad3322b23d34e8b9571fa6c1a\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`diaria_candidato\` DROP FOREIGN KEY \`FK_5ee5622ceca5b61dc30dbf52169\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`cidades_atendidas_usuarios\` DROP FOREIGN KEY \`FK_c569abe406759d222b20f65a4a7\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`cidades_atendidas_usuarios\` DROP FOREIGN KEY \`FK_13b86a4d6f1094e0b89c9b71ca0\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_c569abe406759d222b20f65a4a\` ON \`cidades_atendidas_usuarios\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_13b86a4d6f1094e0b89c9b71ca\` ON \`cidades_atendidas_usuarios\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`usuario_api\` DROP COLUMN \`tipo_usuario\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`usuario_api\` ADD \`tipo_usuario\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`foto\` DROP INDEX \`IDX_135b0623c99bc0465eaeaa81a2\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`cidades_atendidas_usuarios\` DROP PRIMARY KEY`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cidades_atendidas_usuarios\` ADD PRIMARY KEY (\`usuarioApiId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cidades_atendidas_usuarios\` DROP COLUMN \`cidadesAtendidasId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`cidades_atendidas_usuarios\` DROP COLUMN \`usuarioApiId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`cidades_atendidas_usuarios\` ADD \`usuario_api_id\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cidades_atendidas_usuarios\` ADD PRIMARY KEY (\`usuario_api_id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cidades_atendidas_usuarios\` ADD \`cidades_atendidas_id\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cidades_atendidas_usuarios\` DROP PRIMARY KEY`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cidades_atendidas_usuarios\` ADD PRIMARY KEY (\`cidades_atendidas_id\`, \`usuario_api_id\`)`,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_a5ad3322b23d34e8b9571fa6c1\` ON \`diaria_candidato\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_5ee5622ceca5b61dc30dbf5216\` ON \`diaria_candidato\``,
    );
    await queryRunner.query(`DROP TABLE \`diaria_candidato\``);
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_f4879f5b808cfd80e37001312e\` ON \`usuario_api\` (\`endereco_id\`)`,
    );
  }
}
