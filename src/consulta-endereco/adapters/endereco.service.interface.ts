import { Injectable } from '@nestjs/common';
import { EnderecoResponse } from '../dtos/enderecoResponse.dto';
import { ViaCepService } from '../providers/viaCep.service';
import { IEndereco } from './IEndereco';

@Injectable()
export class EnderecoService implements IEndereco {
  constructor(private readonly viaCep: ViaCepService) {}
  async buscarEnderecoPorCep(cep: string): Promise<EnderecoResponse> {
    return await this.viaCep.buscarEnderecoPorCep(cep);
  }
}
