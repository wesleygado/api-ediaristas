import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { EnderecoResponse } from '../dtos/enderecoResponse.dto';
import axios from 'axios';

@Injectable()
export class ViaCepService {
  DIARISTAS = new EnderecoResponse();
  async buscarEnderecoPorCep(cep: string): Promise<EnderecoResponse> {
    const URL_CEP = `http://viacep.com.br/ws/${cep}/json/`;

    try {
      const enderecoBody = await axios.get(URL_CEP);
      this.DIARISTAS = enderecoBody.data;
    } catch (error) {
      if (error.response['status'] === 400) {
        throw new BadRequestException('CEP INVÁLIDO');
      }

      if (error.response['status'] === 500) {
        throw new InternalServerErrorException('ERRO INTERNO');
      }
    }

    if (this.DIARISTAS['erro'] === true) {
      throw new NotFoundException('CEP NÃO ENCONTRADO');
    }

    return this.DIARISTAS;
  }
}
