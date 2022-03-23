import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsuarioRequestDto } from './dtos/usuario-request.dto';
import { UsuarioService } from './usuario.service';

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
}
