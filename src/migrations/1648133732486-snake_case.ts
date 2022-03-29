import { MigrationInterface, QueryRunner } from 'typeorm';

export class snakeCase1648133732486 implements MigrationInterface {
  name = 'snakeCase1648133732486';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`usuario_api\` CHANGE \`tipoUsuario\` \`tipo_usuario\` enum ('Cliente', 'Diarista') NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`usuario_api\` CHANGE \`tipo_usuario\` \`tipo_usuario\` enum ('1', '2') NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`usuario_api\` CHANGE \`tipo_usuario\` \`tipo_usuario\` enum ('Cliente', 'Diarista') NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`usuario_api\` CHANGE \`tipo_usuario\` \`tipoUsuario\` enum ('Cliente', 'Diarista') NOT NULL`,
    );
  }
}
