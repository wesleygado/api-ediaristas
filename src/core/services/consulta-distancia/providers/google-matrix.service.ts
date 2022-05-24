/* eslint-disable prettier/prettier */
import { BadRequestException } from '@nestjs/common';
import axios from 'axios';
import { DiariaResponseDto } from 'src/api/diarias/dto/diaria-response.dto';
import { ConsultaDistanciaInterface } from '../consulta-distancia.interface';
import { DistanciaResponseDto } from '../distancia-response.dto';

export class GoogleMatrixService implements ConsultaDistanciaInterface {
  API_KEY = process.env.API_KEY;

  async calcularDistanciaEntreDoisCeps(
    origem: string,
    destino: string,
  ): Promise<DistanciaResponseDto> {
    this.validarCep(origem);
    this.validarCep(destino);

    const URL_GOOGLE_MAPS = `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${destino}&origins=${origem}&key=${this.API_KEY}`;

    const dadosDistancia = new DistanciaResponseDto();

    const matrixApiData = await axios.get(URL_GOOGLE_MAPS);

    dadosDistancia.origem = matrixApiData.data.origin_addresses[0];
    dadosDistancia.destino = matrixApiData.data.destination_addresses[0];
    dadosDistancia.distanciaEmKm =
      matrixApiData.data.rows[0].elements[0].distance.value / 1000.0;

    return dadosDistancia;
  }

  private validarCep(cep: string): void {
    if (cep.length != 8) {
      throw new BadRequestException('O CEP deve ter 8 digitos');
    }

    if (cep.match("[a-zA-Z]")) {
      throw new BadRequestException(
        'O CEP deve ter apenas caracteres númericos',
      );
    }
  }
}
