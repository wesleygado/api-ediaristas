import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UsuarioRepository } from 'src/api/usuarios/usuario.repository';

@ValidatorConstraint({ name: 'CpfJaExiste', async: true })
@Injectable()
export class CpfJaExiste implements ValidatorConstraintInterface {
  constructor(private readonly usuarioRepository: UsuarioRepository) {}

  async validate(cpf: string) {
    const existeUsuario = await this.usuarioRepository.repository.findOneBy({
      cpf: cpf,
    });
    return !existeUsuario ? true : false;
  }

  defaultMessage() {
    return 'CPF já cadastrado';
  }
}
