import {MigrationInterface, QueryRunner} from "typeorm";

export class bancoTeste1651616087866 implements MigrationInterface {
    name = 'bancoTeste1651616087866'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`foto\` (\`id\` int NOT NULL AUTO_INCREMENT, \`file_name\` varchar(255) NOT NULL, \`content_length\` int NOT NULL, \`content_type\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_135b0623c99bc0465eaeaa81a2\` (\`file_name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`usuario_api\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome_completo\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`senha\` varchar(255) NOT NULL, \`tipo_usuario\` enum ('1', '2') NOT NULL, \`cpf\` varchar(11) NULL, \`nascimento\` datetime NULL, \`telefone\` varchar(11) NULL, \`reputacao\` int NULL, \`chave_pix\` varchar(255) NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`foto_usuario\` int NULL, \`foto_documento\` int NULL, UNIQUE INDEX \`IDX_453669c5a5b4d332a67ce1d42b\` (\`email\`), UNIQUE INDEX \`IDX_8364178fb5011db989bf4a1565\` (\`cpf\`), UNIQUE INDEX \`IDX_4e0e37b7fb53321b8aec5484f3\` (\`chave_pix\`), UNIQUE INDEX \`REL_401d8e2a36cf32c19a6a9226dc\` (\`foto_usuario\`), UNIQUE INDEX \`REL_336688b5460b598bd991358aed\` (\`foto_documento\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`cidades_atendidas\` (\`id\` int NOT NULL AUTO_INCREMENT, \`codigo_ibge\` varchar(255) NOT NULL, \`cidade\` varchar(255) NOT NULL, \`estado\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`diaria\` (\`id\` int NOT NULL AUTO_INCREMENT, \`data_atendimento\` datetime NOT NULL, \`tempo_atendimento\` int NOT NULL, \`status\` int NOT NULL, \`preco\` int NOT NULL, \`valor_comissao\` int NOT NULL, \`logradouro\` varchar(255) NOT NULL, \`numero\` int NOT NULL, \`bairro\` varchar(255) NOT NULL, \`complemento\` varchar(255) NULL, \`cidade\` varchar(255) NOT NULL, \`estado\` varchar(255) NOT NULL, \`cep\` varchar(255) NOT NULL, \`codigo_ibge\` varchar(255) NOT NULL, \`quantidade_quartos\` int NOT NULL, \`quantidade_salas\` int NOT NULL, \`quantidade_cozinhas\` int NOT NULL, \`quantidade_banheiros\` int NOT NULL, \`quantidade_quintas\` int NOT NULL, \`quantidade_outros\` int NOT NULL, \`observacoes\` varchar(255) NULL, \`motivo_cancelamento\` varchar(255) NULL, \`servico\` int NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`cliente_id\` int NOT NULL, \`diarista_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`token\` (\`id\` int NOT NULL AUTO_INCREMENT, \`token\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`cidades_atendidas_usuarios\` (\`usuarioApiId\` int NOT NULL, \`cidadesAtendidasId\` int NOT NULL, INDEX \`IDX_13b86a4d6f1094e0b89c9b71ca\` (\`usuarioApiId\`), INDEX \`IDX_c569abe406759d222b20f65a4a\` (\`cidadesAtendidasId\`), PRIMARY KEY (\`usuarioApiId\`, \`cidadesAtendidasId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`diaria_candidato\` (\`diariaId\` int NOT NULL, \`usuarioApiId\` int NOT NULL, INDEX \`IDX_5ee5622ceca5b61dc30dbf5216\` (\`diariaId\`), INDEX \`IDX_a5ad3322b23d34e8b9571fa6c1\` (\`usuarioApiId\`), PRIMARY KEY (\`diariaId\`, \`usuarioApiId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`usuario_api\` ADD CONSTRAINT \`FK_401d8e2a36cf32c19a6a9226dc9\` FOREIGN KEY (\`foto_usuario\`) REFERENCES \`foto\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`usuario_api\` ADD CONSTRAINT \`FK_336688b5460b598bd991358aeda\` FOREIGN KEY (\`foto_documento\`) REFERENCES \`foto\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
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
        await queryRunner.query(`ALTER TABLE \`usuario_api\` DROP FOREIGN KEY \`FK_336688b5460b598bd991358aeda\``);
        await queryRunner.query(`ALTER TABLE \`usuario_api\` DROP FOREIGN KEY \`FK_401d8e2a36cf32c19a6a9226dc9\``);
        await queryRunner.query(`DROP INDEX \`IDX_a5ad3322b23d34e8b9571fa6c1\` ON \`diaria_candidato\``);
        await queryRunner.query(`DROP INDEX \`IDX_5ee5622ceca5b61dc30dbf5216\` ON \`diaria_candidato\``);
        await queryRunner.query(`DROP TABLE \`diaria_candidato\``);
        await queryRunner.query(`DROP INDEX \`IDX_c569abe406759d222b20f65a4a\` ON \`cidades_atendidas_usuarios\``);
        await queryRunner.query(`DROP INDEX \`IDX_13b86a4d6f1094e0b89c9b71ca\` ON \`cidades_atendidas_usuarios\``);
        await queryRunner.query(`DROP TABLE \`cidades_atendidas_usuarios\``);
        await queryRunner.query(`DROP TABLE \`token\``);
        await queryRunner.query(`DROP TABLE \`diaria\``);
        await queryRunner.query(`DROP TABLE \`cidades_atendidas\``);
        await queryRunner.query(`DROP INDEX \`REL_336688b5460b598bd991358aed\` ON \`usuario_api\``);
        await queryRunner.query(`DROP INDEX \`REL_401d8e2a36cf32c19a6a9226dc\` ON \`usuario_api\``);
        await queryRunner.query(`DROP INDEX \`IDX_4e0e37b7fb53321b8aec5484f3\` ON \`usuario_api\``);
        await queryRunner.query(`DROP INDEX \`IDX_8364178fb5011db989bf4a1565\` ON \`usuario_api\``);
        await queryRunner.query(`DROP INDEX \`IDX_453669c5a5b4d332a67ce1d42b\` ON \`usuario_api\``);
        await queryRunner.query(`DROP TABLE \`usuario_api\``);
        await queryRunner.query(`DROP INDEX \`IDX_135b0623c99bc0465eaeaa81a2\` ON \`foto\``);
        await queryRunner.query(`DROP TABLE \`foto\``);
    }

}
