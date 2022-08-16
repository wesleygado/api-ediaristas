import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UsuarioRepository } from 'src/api/usuarios/usuario.repository';

@ValidatorConstraint({ name: 'EmailJaExiste', async: true })
@Injectable()
export class EmailJaExiste implements ValidatorConstraintInterface {
  constructor(private readonly usuarioRepository: UsuarioRepository) {}

  async validate(email: string) {
    const existeUsuario = await this.usuarioRepository.repository.findOneBy({
      email: email,
    });
    return !existeUsuario ? true : false;
  }

  defaultMessage() {
    return 'E-mail já cadastrado';
  }
}
