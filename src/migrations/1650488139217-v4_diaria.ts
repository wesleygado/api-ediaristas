import {MigrationInterface, QueryRunner} from "typeorm";

export class v4Diaria1650488139217 implements MigrationInterface {
    name = 'v4Diaria1650488139217'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`diaria\` (\`id\` int NOT NULL AUTO_INCREMENT, \`data_atendimento\` datetime NOT NULL, \`tempo_atendimento\` int NOT NULL, \`status\` int NOT NULL, \`preco\` int NOT NULL, \`valor_comissao\` int NOT NULL, \`logradouro\` varchar(255) NOT NULL, \`numero\` int NOT NULL, \`bairro\` varchar(255) NOT NULL, \`complemento\` varchar(255) NULL, \`cidade\` varchar(255) NOT NULL, \`estado\` varchar(255) NOT NULL, \`cep\` varchar(255) NOT NULL, \`codigo_ibge\` varchar(255) NOT NULL, \`quantidade_quartos\` int NOT NULL, \`quantidade_salas\` int NOT NULL, \`quantidade_cozinhas\` int NOT NULL, \`quantidade_banheiros\` int NOT NULL, \`quantidade_quintas\` int NOT NULL, \`quantidade_outros\` int NOT NULL, \`observacoes\` varchar(255) NULL, \`motivo_cancelamento\` varchar(255) NOT NULL, \`servico\` int NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`cliente_id\` int NOT NULL, \`diarista_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`diaria_candidato\` (\`diariaId\` int NOT NULL, \`usuarioApiId\` int NOT NULL, INDEX \`IDX_5ee5622ceca5b61dc30dbf5216\` (\`diariaId\`), INDEX \`IDX_a5ad3322b23d34e8b9571fa6c1\` (\`usuarioApiId\`), PRIMARY KEY (\`diariaId\`, \`usuarioApiId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`cidades_atendidas_usuarios\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`cidades_atendidas_usuarios\` ADD PRIMARY KEY (\`cidades_atendidas_id\`)`);
        await queryRunner.query(`ALTER TABLE \`cidades_atendidas_usuarios\` DROP COLUMN \`usuario_api_id\``);
        await queryRunner.query(`ALTER TABLE \`cidades_atendidas_usuarios\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`cidades_atendidas_usuarios\` DROP COLUMN \`cidades_atendidas_id\``);
        await queryRunner.query(`ALTER TABLE \`cidades_atendidas_usuarios\` ADD \`usuarioApiId\` int NOT NULL PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`cidades_atendidas_usuarios\` ADD \`cidadesAtendidasId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`cidades_atendidas_usuarios\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`cidades_atendidas_usuarios\` ADD PRIMARY KEY (\`usuarioApiId\`, \`cidadesAtendidasId\`)`);
        await queryRunner.query(`ALTER TABLE \`foto\` ADD UNIQUE INDEX \`IDX_135b0623c99bc0465eaeaa81a2\` (\`file_name\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_13b86a4d6f1094e0b89c9b71ca\` ON \`cidades_atendidas_usuarios\` (\`usuarioApiId\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_c569abe406759d222b20f65a4a\` ON \`cidades_atendidas_usuarios\` (\`cidadesAtendidasId\`)`);
        await queryRunner.query(`ALTER TABLE \`diaria\` ADD CONSTRAINT \`FK_c56ef36204dc70df6bd89952fcd\` FOREIGN KEY (\`cliente_id\`) REFERENCES \`usuario_api\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`diaria\` ADD CONSTRAINT \`FK_c6be57059c27ed5e34f66fc6da6\` FOREIGN KEY (\`diarista_id\`) REFERENCES \`usuario_api\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cidades_atendidas_usuarios\` ADD CONSTRAINT \`FK_13b86a4d6f1094e0b89c9b71ca0\` FOREIGN KEY (\`usuarioApiId\`) REFERENCES \`usuario_api\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`cidades_atendidas_usuarios\` ADD CONSTRAINT \`FK_c569abe406759d222b20f65a4a7\` FOREIGN KEY (\`cidadesAtendidasId\`) REFERENCES \`cidades_atendidas\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`diaria_candidato\` ADD CONSTRAINT \`FK_5ee5622ceca5b61dc30dbf52169\` FOREIGN KEY (\`diariaId\`) REFERENCES \`diaria\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`diaria_candidato\` ADD CONSTRAINT \`FK_a5ad3322b23d34e8b9571fa6c1a\` FOREIGN KEY (\`usuarioApiId\`) REFERENCES \`usuario_api\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`diaria_candidato\` DROP FOREIGN KEY \`FK_a5ad3322b23d34e8b9571fa6c1a\``);
        await queryRunner.query(`ALTER TABLE \`diaria_candidato\` DROP FOREIGN KEY \`FK_5ee5622ceca5b61dc30dbf52169\``);
        await queryRunner.query(`ALTER TABLE \`cidades_atendidas_usuarios\` DROP FOREIGN KEY \`FK_c569abe406759d222b20f65a4a7\``);
        await queryRunner.query(`ALTER TABLE \`cidades_atendidas_usuarios\` DROP FOREIGN KEY \`FK_13b86a4d6f1094e0b89c9b71ca0\``);
        await queryRunner.query(`ALTER TABLE \`diaria\` DROP FOREIGN KEY \`FK_c6be57059c27ed5e34f66fc6da6\``);
        await queryRunner.query(`ALTER TABLE \`diaria\` DROP FOREIGN KEY \`FK_c56ef36204dc70df6bd89952fcd\``);
        await queryRunner.query(`DROP INDEX \`IDX_c569abe406759d222b20f65a4a\` ON \`cidades_atendidas_usuarios\``);
        await queryRunner.query(`DROP INDEX \`IDX_13b86a4d6f1094e0b89c9b71ca\` ON \`cidades_atendidas_usuarios\``);
        await queryRunner.query(`ALTER TABLE \`foto\` DROP INDEX \`IDX_135b0623c99bc0465eaeaa81a2\``);
        await queryRunner.query(`ALTER TABLE \`cidades_atendidas_usuarios\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`cidades_atendidas_usuarios\` ADD PRIMARY KEY (\`usuarioApiId\`)`);
        await queryRunner.query(`ALTER TABLE \`cidades_atendidas_usuarios\` DROP COLUMN \`cidadesAtendidasId\``);
        await queryRunner.query(`ALTER TABLE \`cidades_atendidas_usuarios\` DROP COLUMN \`usuarioApiId\``);
        await queryRunner.query(`ALTER TABLE \`cidades_atendidas_usuarios\` ADD \`cidades_atendidas_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`cidades_atendidas_usuarios\` ADD PRIMARY KEY (\`cidades_atendidas_id\`)`);
        await queryRunner.query(`ALTER TABLE \`cidades_atendidas_usuarios\` ADD \`usuario_api_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`cidades_atendidas_usuarios\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`cidades_atendidas_usuarios\` ADD PRIMARY KEY (\`usuario_api_id\`, \`cidades_atendidas_id\`)`);
        await queryRunner.query(`DROP INDEX \`IDX_a5ad3322b23d34e8b9571fa6c1\` ON \`diaria_candidato\``);
        await queryRunner.query(`DROP INDEX \`IDX_5ee5622ceca5b61dc30dbf5216\` ON \`diaria_candidato\``);
        await queryRunner.query(`DROP TABLE \`diaria_candidato\``);
        await queryRunner.query(`DROP TABLE \`diaria\``);
    }

}
