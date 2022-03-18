import { Controller, Get, Query } from '@nestjs/common';
import { EnderecoResponse } from './dtos/enderecoResponse.dto';
import { EnderecoMapper } from './endereco.mapper';
import { EnderecoService } from './adapters/endereco.service.interface';

@Controller('api/enderecos')
export class EnderecoController {
  constructor(
    private readonly enderecoService: EnderecoService,
    private readonly enderecoMapper: EnderecoMapper,
  ) {}

  @Get('?')
  async buscarEnderecoPorCep(
    @Query('cep') cep: string,
  ): Promise<EnderecoResponse> {
    const endereco = await this.enderecoService.buscarEnderecoPorCep(cep);
    return this.enderecoMapper.toEnderecoResponseDto(endereco);
  }
}
