import { HttpService } from '@nestjs/axios';
import { Controller, Get, Param } from '@nestjs/common';
import { ViaCepService } from 'src/consulta-endereco/providers/viaCep.service';
import { DiaristaMapper } from './diarista.mapper';
import { DiaristaService } from './diarista.service';

@Controller('api/diaristas')
export class DiaristaController {
  constructor(
    private readonly diaristaService: DiaristaService,
    private httpService: HttpService,
    private viaCepService: ViaCepService,
    private diaristaMapper: DiaristaMapper,
  ) {}

  @Get('/localidades/:cep')
  async findByCep(@Param('cep') cep: string) {
    return this.diaristaService.buscarDiaristasPorCep(cep);
  }
}
