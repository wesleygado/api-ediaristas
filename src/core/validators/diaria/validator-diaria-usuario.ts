import { ForbiddenException } from '@nestjs/common';
import { DiariaResponseDto } from 'src/api/diarias/dto/diaria-response.dto';
import { UsuarioApi } from 'src/api/usuarios/entities/usuario.entity';
import TipoUsuario from 'src/api/usuarios/enum/tipoUsuario-enum';

export class ValidatorDiariaUsuario {
  validarDiariaUsuario(usuario: UsuarioApi, diaria: DiariaResponseDto) {
    if (usuario.tipoUsuario === TipoUsuario.CLIENTE) {
      if (!diaria.cliente) {
        throw new ForbiddenException('Acesso negado');
      }
      if (usuario.id === diaria.cliente.id) {
        return diaria;
      }
    }

    if (usuario.tipoUsuario === TipoUsuario.DIARISTA) {
      if (!diaria.diarista) {
        throw new ForbiddenException('Acesso negado');
      }
      if (usuario.id === diaria.diarista.id) {
        return diaria;
      }
    }

    throw new ForbiddenException('Acesso negado');
  }
}