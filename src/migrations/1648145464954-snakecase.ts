import { MigrationInterface, QueryRunner } from 'typeorm';

export class snakecase1648145464954 implements MigrationInterface {
  name = 'snakecase1648145464954';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`cidades_atendidas_usuarios\` DROP FOREIGN KEY \`FK_13b86a4d6f1094e0b89c9b71ca0\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`cidades_atendidas_usuarios\` DROP FOREIGN KEY \`FK_c569abe406759d222b20f65a4a7\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_13b86a4d6f1094e0b89c9b71ca\` ON \`cidades_atendidas_usuarios\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_c569abe406759d222b20f65a4a\` ON \`cidades_atendidas_usuarios\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`cidades_atendidas_usuarios\` DROP PRIMARY KEY`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cidades_atendidas_usuarios\` ADD PRIMARY KEY (\`cidadesAtendidasId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cidades_atendidas_usuarios\` DROP COLUMN \`usuarioApiId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`cidades_atendidas_usuarios\` DROP PRIMARY KEY`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cidades_atendidas_usuarios\` DROP COLUMN \`cidadesAtendidasId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`cidades_atendidas_usuarios\` ADD \`usuario_api_id\` int NOT NULL PRIMARY KEY`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cidades_atendidas_usuarios\` ADD \`cidades_atendidas_id\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cidades_atendidas_usuarios\` DROP PRIMARY KEY`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cidades_atendidas_usuarios\` ADD PRIMARY KEY (\`usuario_api_id\`, \`cidades_atendidas_id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`usuario_api\` CHANGE \`tipo_usuario\` \`tipo_usuario\` enum ('1', '2') NOT NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_92ec02c2726dc30411ac8ccd3e\` ON \`cidades_atendidas_usuarios\` (\`usuario_api_id\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_acb5beafbb5aa391950021f149\` ON \`cidades_atendidas_usuarios\` (\`cidades_atendidas_id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cidades_atendidas_usuarios\` ADD CONSTRAINT \`FK_92ec02c2726dc30411ac8ccd3e4\` FOREIGN KEY (\`usuario_api_id\`) REFERENCES \`usuario_api\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cidades_atendidas_usuarios\` ADD CONSTRAINT \`FK_acb5beafbb5aa391950021f1499\` FOREIGN KEY (\`cidades_atendidas_id\`) REFERENCES \`cidades_atendidas\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`cidades_atendidas_usuarios\` DROP FOREIGN KEY \`FK_acb5beafbb5aa391950021f1499\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`cidades_atendidas_usuarios\` DROP FOREIGN KEY \`FK_92ec02c2726dc30411ac8ccd3e4\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_acb5beafbb5aa391950021f149\` ON \`cidades_atendidas_usuarios\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_92ec02c2726dc30411ac8ccd3e\` ON \`cidades_atendidas_usuarios\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`usuario_api\` CHANGE \`tipo_usuario\` \`tipo_usuario\` enum ('Cliente', 'Diarista') NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cidades_atendidas_usuarios\` DROP PRIMARY KEY`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cidades_atendidas_usuarios\` ADD PRIMARY KEY (\`usuario_api_id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cidades_atendidas_usuarios\` DROP COLUMN \`cidades_atendidas_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`cidades_atendidas_usuarios\` DROP COLUMN \`usuario_api_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`cidades_atendidas_usuarios\` ADD \`cidadesAtendidasId\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cidades_atendidas_usuarios\` ADD PRIMARY KEY (\`cidadesAtendidasId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cidades_atendidas_usuarios\` ADD \`usuarioApiId\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cidades_atendidas_usuarios\` DROP PRIMARY KEY`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cidades_atendidas_usuarios\` ADD PRIMARY KEY (\`usuarioApiId\`, \`cidadesAtendidasId\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_c569abe406759d222b20f65a4a\` ON \`cidades_atendidas_usuarios\` (\`cidadesAtendidasId\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_13b86a4d6f1094e0b89c9b71ca\` ON \`cidades_atendidas_usuarios\` (\`usuarioApiId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cidades_atendidas_usuarios\` ADD CONSTRAINT \`FK_c569abe406759d222b20f65a4a7\` FOREIGN KEY (\`cidadesAtendidasId\`) REFERENCES \`cidades_atendidas\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cidades_atendidas_usuarios\` ADD CONSTRAINT \`FK_13b86a4d6f1094e0b89c9b71ca0\` FOREIGN KEY (\`usuarioApiId\`) REFERENCES \`usuario_api\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }
}
