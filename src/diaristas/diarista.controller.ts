import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { DiaristaService } from './diarista.service';
import { InjectMapper, MapInterceptor, MapPipe } from '@automapper/nestjs';
import { DiaristaLocalidadeResponseDto } from './dto/diaristaLocalidadeResponse.dto';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Mapper } from '@automapper/core';

@Controller('api/diaristas')
export class DiaristaController {
  constructor(
    private readonly diaristaService: DiaristaService,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  @Get('/localidades')
  @UseInterceptors(MapInterceptor(DiaristaLocalidadeResponseDto, Usuario))
  async findAll() {
    return this.diaristaService.buscarDiaristasPorCep();
  }

  @Get(':id')
  @UseInterceptors(MapInterceptor(DiaristaLocalidadeResponseDto, Usuario))
  async findOne(@Param('id') id: number) {
    return await this.diaristaService.findOne(id);
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
