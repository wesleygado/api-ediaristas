import { MigrationInterface, QueryRunner } from 'typeorm';

export class enderecoDiarista1651692190066 implements MigrationInterface {
  name = 'enderecoDiarista1651692190066';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`diaria_candidato\` DROP PRIMARY KEY`,
    );
    await queryRunner.query(
      `ALTER TABLE \`diaria_candidato\` ADD PRIMARY KEY (\`usuario_ap_id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`usuario_api\` ADD \`endereco_id\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`usuario_api\` ADD UNIQUE INDEX \`IDX_f4879f5b808cfd80e37001312e\` (\`endereco_id\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_f4879f5b808cfd80e37001312e\` ON \`usuario_api\` (\`endereco_id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`usuario_api\` ADD CONSTRAINT \`FK_f4879f5b808cfd80e37001312ed\` FOREIGN KEY (\`endereco_id\`) REFERENCES \`endereco_diarista\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`diaria\` ADD CONSTRAINT \`FK_c56ef36204dc70df6bd89952fcd\` FOREIGN KEY (\`cliente_id\`) REFERENCES \`usuario_api\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`diaria\` ADD CONSTRAINT \`FK_c6be57059c27ed5e34f66fc6da6\` FOREIGN KEY (\`diarista_id\`) REFERENCES \`usuario_api\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cidades_atendidas_usuarios\` ADD CONSTRAINT \`FK_13b86a4d6f1094e0b89c9b71ca0\` FOREIGN KEY (\`usuarioApiId\`) REFERENCES \`usuario_api\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
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
      `ALTER TABLE \`diaria\` DROP FOREIGN KEY \`FK_c6be57059c27ed5e34f66fc6da6\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`diaria\` DROP FOREIGN KEY \`FK_c56ef36204dc70df6bd89952fcd\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`usuario_api\` DROP FOREIGN KEY \`FK_f4879f5b808cfd80e37001312ed\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_a5ad3322b23d34e8b9571fa6c1\` ON \`diaria_candidato\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_5ee5622ceca5b61dc30dbf5216\` ON \`diaria_candidato\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_c569abe406759d222b20f65a4a\` ON \`cidades_atendidas_usuarios\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_13b86a4d6f1094e0b89c9b71ca\` ON \`cidades_atendidas_usuarios\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_f4879f5b808cfd80e37001312e\` ON \`usuario_api\``,
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
      `ALTER TABLE \`diaria_candidato\` DROP PRIMARY KEY`,
    );
    await queryRunner.query(
      `ALTER TABLE \`diaria_candidato\` ADD PRIMARY KEY (\`diariaId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`diaria_candidato\` DROP COLUMN \`usuarioApiId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`diaria_candidato\` DROP COLUMN \`diariaId\``,
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
      `ALTER TABLE \`usuario_api\` DROP INDEX \`IDX_f4879f5b808cfd80e37001312e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`usuario_api\` DROP COLUMN \`endereco_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`diaria_candidato\` ADD \`usuario_ap_id\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`diaria_candidato\` ADD PRIMARY KEY (\`usuario_ap_id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`diaria_candidato\` ADD \`diaria_id\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`diaria_candidato\` DROP PRIMARY KEY`,
    );
    await queryRunner.query(
      `ALTER TABLE \`diaria_candidato\` ADD PRIMARY KEY (\`diaria_id\`, \`usuario_ap_id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cidades_atendidas_usuarios\` ADD \`usuario_api_id\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cidades_atendidas_usuarios\` ADD \`cidades_atendidas_id\` int NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE \`endereco_diarista\``);
    await queryRunner.query(
      `CREATE INDEX \`IDX_a5ad3322b23d34e8b9571fa6c1\` ON \`diaria_candidato\` (\`usuario_ap_id\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_5ee5622ceca5b61dc30dbf5216\` ON \`diaria_candidato\` (\`diaria_id\`)`,
    );
  }
}
