import { Controller, Get, Param } from '@nestjs/common';
import { DiaristaService } from './diarista.service';

@Controller('api/diaristas')
export class DiaristaController {
  constructor(private readonly diaristaService: DiaristaService) {}

  @Get('/localidades/:cep')
  async findByCep(@Param('cep') cep: string) {
    return this.diaristaService.buscarDiaristasPorCep(cep);
  }
}
