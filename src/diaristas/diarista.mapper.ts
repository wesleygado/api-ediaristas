import { Injectable } from '@nestjs/common';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { DiaristaLocalidadeResponseDto } from './dtos/diaristaLocalidadeResponse.dto';

@Injectable()
export class DiaristaMapper {
  toDiaristaLocalidadeResponseDto(usuarios: Usuario[]) {
    const diaristas = [];
    for (let i = 0; i < usuarios.length; i++) {
      const diaristaDTO = new DiaristaLocalidadeResponseDto();
      diaristaDTO['nomeCompleto'] = usuarios[i].nomeCompleto;
      diaristaDTO['reputacao'] = usuarios[i].reputacao;
      diaristaDTO['fotoUsuario'] = usuarios[i].fotoUsuario.url;
      diaristaDTO['cidade'] = null;
      diaristas.push(diaristaDTO);
    }
    return diaristas;
  }
}
