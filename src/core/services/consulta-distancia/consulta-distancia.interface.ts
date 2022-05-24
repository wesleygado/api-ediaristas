import { DistanciaResponseDto } from './distancia-response.dto';

export interface ConsultaDistanciaInterface {
  calcularDistanciaEntreDoisCeps(
    origem: string,
    destino: string,
  ): Promise<DistanciaResponseDto>;
}
