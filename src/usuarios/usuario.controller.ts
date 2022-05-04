import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UsuarioRequestDto } from './dtos/usuario-request.dto';
import { UsuarioService } from './usuario.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express, Request } from 'express';
import multerConfig from './mullter-config';

@Controller('api/usuarios')
export class UsuarioController {
  constructor(private readonly usuariosService: UsuarioService) {}

  @Get('/localidades')
  findAll() {
    return this.usuariosService.buscarDiaristasPorCep();
  }

  @Post()
  @UseInterceptors(FileInterceptor('foto_documento', multerConfig))
  async create(
    @Body() usuarioRequestDto: UsuarioRequestDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    return await this.usuariosService.cadastrar(usuarioRequestDto, file, req);
  }
}
