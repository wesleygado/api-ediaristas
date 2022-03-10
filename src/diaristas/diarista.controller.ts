import { HttpService } from '@nestjs/axios';
import { Controller, Get, Param } from '@nestjs/common';
import { response } from 'express';
import { map } from 'rxjs';
import { ViaCepService } from 'src/consulta-endereco/providers/viaCep.service';
import { arrayBuffer } from 'stream/consumers';
import { RepositoryNotFoundError } from 'typeorm';
import { DiaristaService } from './diarista.service';

@Controller('api/diaristas')
export class DiaristaController {
  constructor(
    private readonly diaristaService: DiaristaService,
    private httpService: HttpService,
    private viaCepService: ViaCepService,
  ) {}

  @Get('/localidades/:cep')
  async findByCep(@Param('cep') cep: string) {
    return this.diaristaService.buscarDiaristasPorCep(cep);
  }

  /*  @Post()
  create(@Body() createDiaristaDto: CreateDiaristaDto) {
    return this.diaristaService.create(createDiaristaDto);
  }

  @Get()
  findAll() {
    return this.diaristaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.diaristaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDiaristaDto: UpdateDiaristaDto) {
    return this.diaristaService.update(+id, updateDiaristaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.diaristaService.remove(+id);
  } */
}
