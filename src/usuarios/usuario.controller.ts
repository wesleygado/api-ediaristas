import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UsuarioRequestDto } from './dtos/usuario-request.dto';
import { UsuarioService } from './usuario.service';
import { UsuarioValidator } from 'src/core/validators/usuario-validators';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { FotoDto } from 'src/fotos/dto/foto.dto';
import { diskStorage } from 'multer';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Controller('api/usuarios')
export class UsuarioController {
  constructor(private readonly usuariosService: UsuarioService) {}

  @Get('/localidades')
  findAll() {
    return this.usuariosService.buscarDiaristasPorCep();
  }

  @Post()
  async create(@Body() usuarioRequestDto: UsuarioRequestDto) {
    return await this.usuariosService.cadastrar(usuarioRequestDto);
  }

  @Post('foto/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './src/fotos/uploads',
        filename: (req, file, cb) => {
          const fileName: string =
            path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();

          const extension: string = path.parse(file.originalname).ext;
          cb(null, `${fileName}${extension}`);
        },
      }),
    }),
  )
  async uploadFoto(
    @Body() body: FotoDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return {
      body,
      file: file.path,
    };
  }
}
