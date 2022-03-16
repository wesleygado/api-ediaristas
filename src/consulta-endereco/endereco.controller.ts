import { Controller, Get, Query } from '@nestjs/common';
import { EnderecoResponse } from './dtos/enderecoResponse.dto';
import { EnderecoMapper } from './endereco.mapper';
import { ViaCepService } from './providers/viaCep.service';

@Controller('api/enderecos')
export class EnderecoController {
  constructor(
    private readonly viaCep: ViaCepService,
    private readonly enderecoMapper: EnderecoMapper,
  ) {}

  @Get('?')
  async buscarEnderecoPorCep(
    @Query('cep') cep: string,
  ): Promise<EnderecoResponse> {
    const endereco = await this.viaCep.buscarEnderecoPorCep(cep);
    return this.enderecoMapper.toEnderecoResponseDto(endereco);
  }
}
