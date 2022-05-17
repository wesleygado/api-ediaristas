import { Injectable } from '@nestjs/common';
import { EnderecoResponse } from '../dtos/endereco-response.dto';
import { ViaCepService } from '../../../providers/via-cep.service';
import { IEndereco } from './IEndereco';

@Injectable()
export class EnderecoService implements IEndereco {
  constructor(private readonly viaCep: ViaCepService) {}
  async buscarEnderecoPorCep(cep: string): Promise<EnderecoResponse> {
    return await this.viaCep.buscarEnderecoPorCep(cep);
  }
}
