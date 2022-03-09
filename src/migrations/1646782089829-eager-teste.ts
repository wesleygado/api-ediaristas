import {MigrationInterface, QueryRunner} from "typeorm";

export class eagerTeste1646782089829 implements MigrationInterface {
    name = 'eagerTeste1646782089829'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`usuario\` ADD UNIQUE INDEX \`IDX_fbb237aa3728839dcf0609d807\` (\`chave_pix\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`usuario\` DROP INDEX \`IDX_fbb237aa3728839dcf0609d807\``);
    }

}
