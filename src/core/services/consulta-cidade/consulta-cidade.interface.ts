import { CidadeResponseDto } from './dto/cidade-response.dto';

export interface ConsultaCidade {
  buscarCidadePorCodigoIbge(codigoIbge: string): Promise<CidadeResponseDto>;
}
