import { MigrationInterface, QueryRunner } from 'typeorm';

export class cidadesAtendidasUsuarios1646675723989
  implements MigrationInterface
{
  name = 'cidadesAtendidasUsuarios1646675723989';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`cidades_atendidas\` (\`id\` int NOT NULL AUTO_INCREMENT, \`codigo_ibge\` varchar(255) NOT NULL, \`cidade\` varchar(255) NOT NULL, \`estado\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`cidades_atendidas_usuarios\` (\`usuarioId\` int NOT NULL, \`cidadesAtendidasId\` int NOT NULL, INDEX \`IDX_d2ae896cd13ae42311e439fb2e\` (\`usuarioId\`), INDEX \`IDX_c569abe406759d222b20f65a4a\` (\`cidadesAtendidasId\`), PRIMARY KEY (\`usuarioId\`, \`cidadesAtendidasId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cidades_atendidas_usuarios\` ADD CONSTRAINT \`FK_d2ae896cd13ae42311e439fb2ee\` FOREIGN KEY (\`usuarioId\`) REFERENCES \`usuario\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
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
      `ALTER TABLE \`cidades_atendidas_usuarios\` DROP FOREIGN KEY \`FK_d2ae896cd13ae42311e439fb2ee\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_c569abe406759d222b20f65a4a\` ON \`cidades_atendidas_usuarios\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_d2ae896cd13ae42311e439fb2e\` ON \`cidades_atendidas_usuarios\``,
    );
    await queryRunner.query(`DROP TABLE \`cidades_atendidas_usuarios\``);
    await queryRunner.query(`DROP TABLE \`cidades_atendidas\``);
  }
}
