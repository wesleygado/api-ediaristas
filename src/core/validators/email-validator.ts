/* import { Inject, Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { UsuarioRepository } from 'src/usuarios/usuario.repository';

import { UsuarioValidator } from './usuario-validators';

@Injectable()
@ValidatorConstraint({ name: 'IsEmailValido', async: false })
export class IsEmailValido implements ValidatorConstraintInterface {
  constructor(private readonly repository?: UsuarioRepository) {}
  validate(email: string, args: ValidationArguments) {
    const validator = new UsuarioValidator();
    return validator.validarEmail(email);
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return 'E-mail já existe';
  }
}
 */
