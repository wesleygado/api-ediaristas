import { Injectable } from '@nestjs/common';
import { EnderecoResponse } from '../dtos/enderecoResponse.dto';
import axios from 'axios';

@Injectable()
export class ViaCepService {
  async buscarEnderecoPorCep(cep: string): Promise<EnderecoResponse> {
    const URL_CEP = `http://viacep.com.br/ws/${cep}/json/`;

    const enderecoBody = await axios.get(URL_CEP);
    const response: EnderecoResponse = enderecoBody.data;
    return response;
  }
}
