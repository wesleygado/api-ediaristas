import { CidadeResponseDto } from './dto/cidade-response.dto';

export abstract class ConsultaCidade {
  abstract buscarCidadePorCodigoIbge(
    codigoIbge: string,
  ): Promise<CidadeResponseDto>;
}
