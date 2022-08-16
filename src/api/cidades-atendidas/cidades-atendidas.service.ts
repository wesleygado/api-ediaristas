import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IbgeService } from 'src/core/services/consulta-cidade/consulta-cidade.service';
import { UsuarioApi } from 'src/api/usuarios/entities/usuario.entity';
import { UsuarioRepository } from 'src/api/usuarios/usuario.repository';
import { CidadesAtendidasRepository } from './cidade-atendida.repository';
import { CidadeAtendidaResponseDto } from './dto/cidade-atendida-response.dto';
import { CidadesAtendidasRequestDto } from './dto/cidades-atendidas-request.dto copy';
import { CidadesAtendidas } from './entities/cidades-atendidas.entity';

@Injectable()
export class CidadesAtendidasService {
  constructor(
    private readonly cidadeAtendidaRepository: CidadesAtendidasRepository,
    private readonly consultaCidade: IbgeService,
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
  ): Promise<{ message: string }> {
    const cidadesAtendidas = [];
    request.cidades.forEach(async (cidadeAtendidaRequest) => {
      const codigoIbge = cidadeAtendidaRequest.codigoIbge;

      let cidadeAtendida = new CidadesAtendidas();
      try {
        cidadeAtendida =
          await this.cidadeAtendidaRepository.repository.findByCodigoIbge(
            codigoIbge,
          );
      } catch (error) {
        cidadeAtendida = await this.cadastrarCidadeAtendida(codigoIbge);
      }
      cidadesAtendidas.push(cidadeAtendida);
    });

    usuarioLogado.cidadesAtendidas = cidadesAtendidas;
    await this.usuarioRepository.repository.save(usuarioLogado);

    return { message: 'Cidades Atendidas atualizadas com Sucesso' };
  }
  private async cadastrarCidadeAtendida(codigoIbge: string) {
    const cidade = await this.consultaCidade.buscarCidadePorCodigoIbge(
      codigoIbge,
    );

    const cidadeAtendida = new CidadesAtendidas();
    cidadeAtendida.codigoIbge = codigoIbge;
    cidadeAtendida.cidade = cidade.cidade;
    cidadeAtendida.estado = cidade.estado;

    return await this.cidadeAtendidaRepository.repository.save(cidadeAtendida);
  }
}
