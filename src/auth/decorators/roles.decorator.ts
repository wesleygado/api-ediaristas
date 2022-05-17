import { SetMetadata } from '@nestjs/common';
import { TipoUsuario } from 'src/api/usuarios/enum/tipoUsuario-enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: TipoUsuario[]) => SetMetadata(ROLES_KEY, roles);
