import { Entity } from 'typeorm';

@Entity()
export class DiaristaLocalidadeResponseDto {
  nomeCompleto: string;
  reputacao: number;
}
