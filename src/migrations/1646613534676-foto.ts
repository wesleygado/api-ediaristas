import { MigrationInterface, QueryRunner } from 'typeorm';

export class foto1646613534676 implements MigrationInterface {
  name = 'foto1646613534676';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`foto\` (\`id\` int NOT NULL AUTO_INCREMENT, \`filename\` varchar(255) NOT NULL, \`content_length\` int NOT NULL, \`content_type\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_0fbcd1e321e58c4aef7d719e4d\` (\`filename\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_0fbcd1e321e58c4aef7d719e4d\` ON \`foto\``,
    );
    await queryRunner.query(`DROP TABLE \`foto\``);
  }
}
