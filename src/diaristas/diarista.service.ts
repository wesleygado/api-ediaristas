import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DiaristaRepository } from './diaristaRepository';
import { DiaristaLocalidadeResponseDto } from './dto/diaristaLocalidadeResponse.dto';

@Injectable()
export class DiaristaService {
  constructor(
    @InjectRepository(DiaristaRepository)
    private diaristaRepository: DiaristaRepository,
  ) {}

  async buscarDiaristasPorCep() {
    const usuarios = await this.diaristaRepository.buscarDiaristasPorCep();
    const diaristas = [];
    for (let i = 0; i < usuarios.length; i++) {
      const diaristaDTO = new DiaristaLocalidadeResponseDto();
      diaristaDTO['nomeCompleto'] = usuarios[i].nomeCompleto;
      diaristaDTO['reputacao'] = usuarios[i].reputacao;
      diaristaDTO['fotoUsuario'] = usuarios[i].fotoUsuario.url;
      diaristaDTO['cidadesAtendidas'] = usuarios[i].cidadesAtendidas;
      diaristas.push(diaristaDTO);
    }
    console.log(diaristas);
    return diaristas;
  }
}
