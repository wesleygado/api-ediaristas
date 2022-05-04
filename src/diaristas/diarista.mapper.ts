import { Injectable } from '@nestjs/common';
import { UsuarioApi } from 'src/usuarios/entities/usuario.entity';
import { DiaristaDiariaResponseDto } from './dtos/diarista-diaria.dto';
import { DiaristaLocalidadeResponseDto } from './dtos/diarista-localidade-response.dto';

@Injectable()
export class DiaristaMapper {
  toDiaristaLocalidadeResponseDto(
    usuario: UsuarioApi,
  ): DiaristaLocalidadeResponseDto {
    const diaristaDTO = new DiaristaLocalidadeResponseDto();
    diaristaDTO.nomeCompleto = usuario.nomeCompleto;
    diaristaDTO.reputacao = usuario.reputacao;
    diaristaDTO.fotoUsuario = usuario.fotoUsuario.url;
    diaristaDTO.cidade = null;
    return diaristaDTO;
  }

  toDiaristaDiariaResponseDto(usuario: UsuarioApi): DiaristaDiariaResponseDto {
    if (!usuario) {
      return null;
    }

    const diaristaDTO = new DiaristaDiariaResponseDto();
    diaristaDTO.id = usuario.id;
    diaristaDTO.nomeCompleto = usuario.nomeCompleto;
    diaristaDTO.reputacao = usuario.reputacao;

    if (!usuario.fotoUsuario) {
      diaristaDTO.fotoUsuario = null;
    } else {
      diaristaDTO.fotoUsuario = usuario.fotoUsuario.url;
    }

    diaristaDTO.telefone = usuario.telefone;
    return diaristaDTO;
  }
}
