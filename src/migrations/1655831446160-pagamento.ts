import { MigrationInterface, QueryRunner } from 'typeorm';

export class pagamento1655831446160 implements MigrationInterface {
  name = 'pagamento1655831446160';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`pagamento\` (\`id\` int NOT NULL AUTO_INCREMENT, \`status\` int NOT NULL, \`valor\` int NOT NULL, \`transacao_id\` varchar(255) NOT NULL, \`diaria_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`pagamento\` ADD CONSTRAINT \`FK_9497efafd84f3e4328e039d62d9\` FOREIGN KEY (\`diaria_id\`) REFERENCES \`diaria\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`pagamento\` DROP FOREIGN KEY \`FK_9497efafd84f3e4328e039d62d9\``,
    );
    await queryRunner.query(`DROP TABLE \`pagamento\``);
  }
}
