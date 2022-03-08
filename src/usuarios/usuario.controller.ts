import { Controller, Get } from '@nestjs/common';
import { UsuarioService } from './usuario.service';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuariosService: UsuarioService) {}

  @Get('/localidades')
  findAll() {
    return this.usuariosService.buscarDiaristasPorCep();
  }
}
