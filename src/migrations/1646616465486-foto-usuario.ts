import {MigrationInterface, QueryRunner} from "typeorm";

export class fotoUsuario1646616465486 implements MigrationInterface {
    name = 'fotoUsuario1646616465486'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_23a3c4058b6993c091f6e02219\` ON \`usuario\``);
        await queryRunner.query(`DROP INDEX \`IDX_9e1331de4a9cf56b2e666f7f05\` ON \`usuario\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_9e1331de4a9cf56b2e666f7f05\` ON \`usuario\` (\`foto_usuario\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_23a3c4058b6993c091f6e02219\` ON \`usuario\` (\`foto_documento\`)`);
    }

}
