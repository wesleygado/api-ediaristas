import { DiaristaLocalidadeResponseDto } from './diarista-localidade-response.dto';

export class DiaristaLocalidadesPagedResponse {
  diaristas: DiaristaLocalidadeResponseDto[];
  tamanhoPagina: number;
  totalElementos: number;

  constructor(
    diaristas: DiaristaLocalidadeResponseDto[],
    tamanhoPagina: number,
    totalElementos: number,
  ) {
    this.diaristas = diaristas;
    this.tamanhoPagina =
      totalElementos > tamanhoPagina ? totalElementos - tamanhoPagina : 0;
  }
}
