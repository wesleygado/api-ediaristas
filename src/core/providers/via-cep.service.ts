import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EnderecoResponse } from '../../consulta-endereco/dtos/endereco-response.dto';
import axios from 'axios';

@Injectable()
export class ViaCepService {
  async buscarEnderecoPorCep(cep: string): Promise<EnderecoResponse> {
    const URL_CEP = `http://viacep.com.br/ws/${cep}/json/`;
    let endereco = new EnderecoResponse();

    try {
      const enderecoBody = await axios.get(URL_CEP);
      endereco = enderecoBody.data;
    } catch (error) {
      if (error.response['status'] === 400) {
        throw new BadRequestException('CEP INVÁLIDO');
      }

      if (error.response['status'] === 500) {
        throw new BadRequestException(
          'SERVIÇO DE CEP FORA DO AR - TENTE NOVAMENTE',
        );
      }
    }

    if (endereco['erro'] === true) {
      throw new NotFoundException('CEP NÃO ENCONTRADO');
    }

    return endereco;
  }
}
