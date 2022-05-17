import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UsuarioRepository } from 'src/api/usuarios/usuario.repository';

@ValidatorConstraint({ name: 'ChvePixJaExiste', async: true })
@Injectable()
export class ChavePixJaExiste implements ValidatorConstraintInterface {
  constructor(private readonly usuarioRepository: UsuarioRepository) {}

  async validate(chavePix: string) {
    const existeUsuario = await this.usuarioRepository.findOne({
      chavePix: chavePix,
    });
    return !existeUsuario ? true : false;
  }

  defaultMessage() {
    return 'Chave Pix já cadastrada';
  }
}
