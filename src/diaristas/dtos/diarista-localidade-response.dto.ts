import { Expose } from 'class-transformer';

export class DiaristaLocalidadeResponseDto {
  @Expose({ name: 'nome_completo' })
  nomeCompleto: string;

  reputacao: number;

  @Expose({ name: 'foto_usuario' })
  fotoUsuario: string;

  cidade: string;
}
