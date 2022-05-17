import { Controller, Get, Param, Query } from '@nestjs/common';
import { EnderecoResponse } from './dtos/endereco-response.dto';
import { EnderecoMapper } from './endereco.mapper';
import { EnderecoService } from './adapters/endereco.service.interface';
import { IbgeService } from 'src/core/services/consulta-cidade/consulta-cidade.service';
import { CidadeResponseDto } from 'src/core/services/consulta-cidade/dto/cidade-response.dto';

@Controller('api/enderecos')
export class EnderecoController {
  constructor(
    private readonly enderecoService: EnderecoService,
    private readonly enderecoMapper: EnderecoMapper,
    private readonly ibgeService: IbgeService,
  ) {}

  @Get()
  async buscarEnderecoPorCep(
    @Query('cep') cep: string,
  ): Promise<EnderecoResponse> {
    const endereco = await this.enderecoService.buscarEnderecoPorCep(cep);
    return this.enderecoMapper.toEnderecoResponseDto(endereco);
  }

  @Get('codigoIbge/:codigoIbge')
  async buscarCidadePorCodigoIbge(
    @Param('codigoIbge') codigoIbge: string,
  ): Promise<CidadeResponseDto> {
    const cidade = await this.ibgeService.buscarCidadePorCodigoIbge(codigoIbge);
    return cidade;
  }
}
