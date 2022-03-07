import { MigrationInterface, QueryRunner } from 'typeorm';

export class fotoUsuario1646616047490 implements MigrationInterface {
  name = 'fotoUsuario1646616047490';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`usuario\` DROP COLUMN \`chavePix\``);
    await queryRunner.query(
      `ALTER TABLE \`usuario\` ADD \`chave_pix\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`usuario\` ADD \`foto_usuario\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`usuario\` ADD UNIQUE INDEX \`IDX_9e1331de4a9cf56b2e666f7f05\` (\`foto_usuario\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`usuario\` ADD \`foto_documento\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`usuario\` ADD UNIQUE INDEX \`IDX_23a3c4058b6993c091f6e02219\` (\`foto_documento\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`usuario\` DROP COLUMN \`tipoUsuario\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`usuario\` ADD \`tipoUsuario\` enum ('Cliente', 'Diarista') NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`usuario\` DROP COLUMN \`cpf\``);
    await queryRunner.query(
      `ALTER TABLE \`usuario\` ADD \`cpf\` varchar(11) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`usuario\` ADD UNIQUE INDEX \`IDX_28cd8597e57c8197d4929a98e7\` (\`cpf\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`usuario\` CHANGE \`nascimento\` \`nascimento\` datetime NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`usuario\` DROP COLUMN \`telefone\``);
    await queryRunner.query(
      `ALTER TABLE \`usuario\` ADD \`telefone\` varchar(11) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`usuario\` CHANGE \`reputacao\` \`reputacao\` int NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_9e1331de4a9cf56b2e666f7f05\` ON \`usuario\` (\`foto_usuario\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_23a3c4058b6993c091f6e02219\` ON \`usuario\` (\`foto_documento\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`usuario\` ADD CONSTRAINT \`FK_9e1331de4a9cf56b2e666f7f055\` FOREIGN KEY (\`foto_usuario\`) REFERENCES \`foto\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`usuario\` ADD CONSTRAINT \`FK_23a3c4058b6993c091f6e02219c\` FOREIGN KEY (\`foto_documento\`) REFERENCES \`foto\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`usuario\` DROP FOREIGN KEY \`FK_23a3c4058b6993c091f6e02219c\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`usuario\` DROP FOREIGN KEY \`FK_9e1331de4a9cf56b2e666f7f055\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_23a3c4058b6993c091f6e02219\` ON \`usuario\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_9e1331de4a9cf56b2e666f7f05\` ON \`usuario\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`usuario\` CHANGE \`reputacao\` \`reputacao\` int NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`usuario\` DROP COLUMN \`telefone\``);
    await queryRunner.query(
      `ALTER TABLE \`usuario\` ADD \`telefone\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`usuario\` CHANGE \`nascimento\` \`nascimento\` datetime NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`usuario\` DROP INDEX \`IDX_28cd8597e57c8197d4929a98e7\``,
    );
    await queryRunner.query(`ALTER TABLE \`usuario\` DROP COLUMN \`cpf\``);
    await queryRunner.query(
      `ALTER TABLE \`usuario\` ADD \`cpf\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`usuario\` DROP COLUMN \`tipoUsuario\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`usuario\` ADD \`tipoUsuario\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`usuario\` DROP INDEX \`IDX_23a3c4058b6993c091f6e02219\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`usuario\` DROP COLUMN \`foto_documento\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`usuario\` DROP INDEX \`IDX_9e1331de4a9cf56b2e666f7f05\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`usuario\` DROP COLUMN \`foto_usuario\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`usuario\` DROP COLUMN \`chave_pix\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`usuario\` ADD \`chavePix\` varchar(255) NOT NULL`,
    );
  }
}
