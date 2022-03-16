import { Injectable } from '@nestjs/common';
import { UsuarioApi } from 'src/usuarios/entities/usuario.entity';
import { DiaristaLocalidadeResponseDto } from './dtos/diaristaLocalidadeResponse.dto';

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
}
