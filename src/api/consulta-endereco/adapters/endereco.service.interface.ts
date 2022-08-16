import { Injectable } from '@nestjs/common';
import { ViaCepService } from 'src/core/services/via-cep.service';
import { EnderecoResponse } from '../dtos/endereco-response.dto';
import { IEndereco } from './IEndereco';

@Injectable()
export class EnderecoService implements IEndereco {
  constructor(private readonly viaCep: ViaCepService) {}
  async buscarEnderecoPorCep(cep: string): Promise<EnderecoResponse> {
    return await this.viaCep.buscarEnderecoPorCep(cep);
  }
}
