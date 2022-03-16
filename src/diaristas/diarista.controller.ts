import { Controller, Get, Param, Query } from '@nestjs/common';
import { DiaristaService } from './diarista.service';

@Controller('api/diaristas')
export class DiaristaController {
  constructor(private readonly diaristaService: DiaristaService) {}

  @Get('/localidades?')
  async findByCep(@Query('cep') cep: string) {
    return this.diaristaService.buscarDiaristasPorCep(cep);
  }

  @Get('/disponibilidade?')
  async verificarDisponibilidadePorCep(@Query('cep') cep: string) {
    return this.diaristaService.verificarDisponibilidadePorCep(cep);
  }
}
