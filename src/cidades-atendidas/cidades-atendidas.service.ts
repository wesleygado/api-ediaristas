import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IbgeService } from 'src/consulta-cidade/consulta-cidade.service';
import { ViaCepService } from 'src/core/providers/via-cep.service';
import { UsuarioApi } from 'src/usuarios/entities/usuario.entity';
import { UsuarioRepository } from 'src/usuarios/usuario.repository';
import { json } from 'stream/consumers';
import { CidadesAtendidasRepository } from './cidade-atendida.repository';
import { CidadeAtendidaResponseDto } from './dto/cidade-atendida-response.dto';
import { CidadesAtendidasRequestDto } from './dto/cidades-atendidas-request.dto copy';
import { CidadesAtendidas } from './entities/cidades-atendidas.entity';

@Injectable()
export class CidadesAtendidasService {
  constructor(
    @InjectRepository(CidadesAtendidasRepository)
    private readonly cidadeAtendidaRepository: CidadesAtendidasRepository,
    private readonly consultaCidade: IbgeService,
    @InjectRepository(UsuarioRepository)
    private readonly usuarioRepository: UsuarioRepository,
  ) {}
  listarCidadesAtendidas(
    usuarioLogado: UsuarioApi,
  ): CidadeAtendidaResponseDto[] {
    return usuarioLogado.cidadesAtendidas;
  }

  async atualizarCidadesAtendidas(
    request: CidadesAtendidasRequestDto,
    usuarioLogado: UsuarioApi,
  ): Promise<string> {
    const cidadesAtendidas = [];
    request.cidades.forEach(async (cidadeAtendidaRequest) => {
      const codigoIbge = cidadeAtendidaRequest.codigoIbge;

      let cidadeAtendida = new CidadesAtendidas();
      try {
        cidadeAtendida = await this.cidadeAtendidaRepository.findByCodigoIbge(
          codigoIbge,
        );
      } catch (error) {
        cidadeAtendida = await this.cadastrarCidadeAtendida(codigoIbge);
      }
      cidadesAtendidas.push(cidadeAtendida);
    });

    usuarioLogado.cidadesAtendidas = cidadesAtendidas;
    await this.usuarioRepository.save(usuarioLogado);

    return JSON.parse('Cidades Atendidas com Sucesso');
  }
  private async cadastrarCidadeAtendida(codigoIbge: string) {
    const cidade = await this.consultaCidade.buscarCidadePorCodigoIbge(
      codigoIbge,
    );

    const cidadeAtendida = new CidadesAtendidas();
    cidadeAtendida.codigoIbge = codigoIbge;
    cidadeAtendida.cidade = cidade.cidade;
    cidadeAtendida.estado = cidade.estado;

    return await this.cidadeAtendidaRepository.save(cidadeAtendida);
  }
}
