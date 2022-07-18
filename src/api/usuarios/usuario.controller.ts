import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsuarioRequestDto } from './dtos/usuario-request.dto';
import { UsuarioService } from './usuario.service';
import multerConfig from './mullter-config';
import { Request } from 'express';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { UsuarioApi } from './entities/usuario.entity';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { UsuarioAtualizarRequest } from './dtos/usuario-atualizar-request.dto';

@Controller('api/usuarios')
export class UsuarioController {
  constructor(private readonly usuariosService: UsuarioService) {}

  @Get('localidades')
  findAll() {
    return this.usuariosService.buscarDiaristasPorCep();
  }

  @Post()
  @UseInterceptors(FileInterceptor('foto_documento', multerConfig))
  async create(
    @Body() usuarioRequestDto: UsuarioRequestDto,
    @UploadedFile() file: Express.Multer.File,
    req: Request,
  ) {
    return await this.usuariosService.cadastrar(usuarioRequestDto, file, req);
  }

  @Post('foto')
  @UseInterceptors(FileInterceptor('foto_usuario', multerConfig))
  async atualizarFotoUsuario(
    @GetUser() usuarioLogado: UsuarioApi,
    @UploadedFile() file: Express.Multer.File,
    req: Request,
  ) {
    return await this.usuariosService.atualizarFotoUsuario(
      file,
      usuarioLogado,
      req,
    );
  }

  @Put()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async atualizar(
    @GetUser() usuarioLogado: UsuarioApi,
    @Body() request: UsuarioAtualizarRequest,
  ) {
    return this.usuariosService.atualizar(request, usuarioLogado);
  }
}
