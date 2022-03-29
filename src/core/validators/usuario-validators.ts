import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsuarioRequestDto } from 'src/usuarios/dtos/usuario-request.dto';
import { UsuarioRepository } from 'src/usuarios/usuario.repository';

@Injectable()
export class UsuarioValidator {
  constructor(private readonly repository?: UsuarioRepository) {}

  async validarEmail(email: string): Promise<boolean> {
    const existeUsuario = await this.repository.findOne({
      email: email,
    });

    console.log(existeUsuario);

    return !existeUsuario ? false : true;
  }
}
