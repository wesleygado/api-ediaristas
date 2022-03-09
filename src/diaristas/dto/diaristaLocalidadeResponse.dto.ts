import { CidadesAtendidas } from 'src/cidades-atendidas/entities/cidades-atendidas.entity';

export class DiaristaLocalidadeResponseDto {
  nomeCompleto: string;
  reputacao: number;
  fotoUsuario: string;
  cidadesAtendidas: CidadesAtendidas[];
}
