import { MigrationInterface, QueryRunner } from 'typeorm';

export class usuarioApi1647268662094 implements MigrationInterface {
  name = 'usuarioApi1647268662094';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`foto\` (\`id\` int NOT NULL AUTO_INCREMENT, \`filename\` varchar(255) NOT NULL, \`content_length\` int NOT NULL, \`content_type\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_0fbcd1e321e58c4aef7d719e4d\` (\`filename\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`usuario_api\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome_completo\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`senha\` varchar(255) NOT NULL, \`tipoUsuario\` enum ('Cliente', 'Diarista') NOT NULL, \`cpf\` varchar(11) NULL, \`nascimento\` datetime NULL, \`telefone\` varchar(11) NULL, \`reputacao\` int NULL, \`chave_pix\` varchar(255) NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`foto_usuario\` int NULL, \`foto_documento\` int NULL, UNIQUE INDEX \`IDX_453669c5a5b4d332a67ce1d42b\` (\`email\`), UNIQUE INDEX \`IDX_8364178fb5011db989bf4a1565\` (\`cpf\`), UNIQUE INDEX \`IDX_4e0e37b7fb53321b8aec5484f3\` (\`chave_pix\`), UNIQUE INDEX \`REL_401d8e2a36cf32c19a6a9226dc\` (\`foto_usuario\`), UNIQUE INDEX \`REL_336688b5460b598bd991358aed\` (\`foto_documento\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`cidades_atendidas\` (\`id\` int NOT NULL AUTO_INCREMENT, \`codigo_ibge\` varchar(255) NOT NULL, \`cidade\` varchar(255) NOT NULL, \`estado\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`cidades_atendidas_usuarios\` (\`usuarioApiId\` int NOT NULL, \`cidadesAtendidasId\` int NOT NULL, INDEX \`IDX_13b86a4d6f1094e0b89c9b71ca\` (\`usuarioApiId\`), INDEX \`IDX_c569abe406759d222b20f65a4a\` (\`cidadesAtendidasId\`), PRIMARY KEY (\`usuarioApiId\`, \`cidadesAtendidasId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`usuario_api\` ADD CONSTRAINT \`FK_401d8e2a36cf32c19a6a9226dc9\` FOREIGN KEY (\`foto_usuario\`) REFERENCES \`foto\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`usuario_api\` ADD CONSTRAINT \`FK_336688b5460b598bd991358aeda\` FOREIGN KEY (\`foto_documento\`) REFERENCES \`foto\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cidades_atendidas_usuarios\` ADD CONSTRAINT \`FK_13b86a4d6f1094e0b89c9b71ca0\` FOREIGN KEY (\`usuarioApiId\`) REFERENCES \`usuario_api\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cidades_atendidas_usuarios\` ADD CONSTRAINT \`FK_c569abe406759d222b20f65a4a7\` FOREIGN KEY (\`cidadesAtendidasId\`) REFERENCES \`cidades_atendidas\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`cidades_atendidas_usuarios\` DROP FOREIGN KEY \`FK_c569abe406759d222b20f65a4a7\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`cidades_atendidas_usuarios\` DROP FOREIGN KEY \`FK_13b86a4d6f1094e0b89c9b71ca0\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`usuario_api\` DROP FOREIGN KEY \`FK_336688b5460b598bd991358aeda\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`usuario_api\` DROP FOREIGN KEY \`FK_401d8e2a36cf32c19a6a9226dc9\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_c569abe406759d222b20f65a4a\` ON \`cidades_atendidas_usuarios\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_13b86a4d6f1094e0b89c9b71ca\` ON \`cidades_atendidas_usuarios\``,
    );
    await queryRunner.query(`DROP TABLE \`cidades_atendidas_usuarios\``);
    await queryRunner.query(`DROP TABLE \`cidades_atendidas\``);
    await queryRunner.query(
      `DROP INDEX \`REL_336688b5460b598bd991358aed\` ON \`usuario_api\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_401d8e2a36cf32c19a6a9226dc\` ON \`usuario_api\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_4e0e37b7fb53321b8aec5484f3\` ON \`usuario_api\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_8364178fb5011db989bf4a1565\` ON \`usuario_api\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_453669c5a5b4d332a67ce1d42b\` ON \`usuario_api\``,
    );
    await queryRunner.query(`DROP TABLE \`usuario_api\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_0fbcd1e321e58c4aef7d719e4d\` ON \`foto\``,
    );
    await queryRunner.query(`DROP TABLE \`foto\``);
  }
}
