import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DiariaRepository } from '../diarias/diaria.repository';
import { Diaria } from '../diarias/entities/diaria.entity';
import { UsuarioApi } from '../usuarios/entities/usuario.entity';
import TipoUsuario from '../usuarios/enum/tipoUsuario-enum';
import { AvaliacaoMapper } from './avaliacao.mapper';
import { AvaliacaoRepository } from './avaliacao.repository';
import { AvaliacaoRequestDto } from './dto/avaliacao-request.dto';
import { AvaliacaoResponseDto } from './dto/avaliacao-response.dto';
import { Avaliacao } from './entities/avaliacao.entity';

@Injectable()
export class AvaliacaoService {
  constructor(
    @InjectRepository(AvaliacaoRepository)
    private readonly avaliacaoRepository: AvaliacaoRepository,
    @InjectRepository(DiariaRepository)
    private readonly diariaRepository: DiariaRepository,
    private readonly avaliacaoMappar: AvaliacaoMapper,
  ) {}

  async avaliarDiaria(
    avaliacaoRequest: AvaliacaoRequestDto,
    id: number,
    usuarioLogado: UsuarioApi,
  ): Promise<{ message: string }> {
    const diaria = await this.buscarDiariaPorId(id);

    await this.validarUsuarioDiaria(usuarioLogado, diaria);
    const avaliador = usuarioLogado;

    const avaliacao = this.avaliacaoMappar.toModel(avaliacaoRequest);
    avaliacao.avaliador = avaliador;
    avaliacao.diaria = diaria;
    avaliacao.visibilidade = true;
    avaliacao.avaliado = this.getAvaliado(avaliacao);
    this.avaliacaoRepository.save(avaliacao);

    return { message: 'Avaliação realizada com sucesso' };
  }

  private buscarDiariaPorId(id: number) {
    return this.diariaRepository.findOne(id);
  }

  private getAvaliado(model: Avaliacao) {
    if (model.avaliador.tipoUsuario === TipoUsuario.CLIENTE) {
      return model.diaria.diarista;
    }
    return model.diaria.cliente;
  }

  private async validarUsuarioDiaria(
    usuarioLogado: UsuarioApi,
    diaria: Diaria,
  ) {
    if (
      usuarioLogado.id !== diaria.diarista.id &&
      usuarioLogado.id !== diaria.cliente.id
    ) {
      const mensagem = 'Acesso Negado';
      throw new ForbiddenException(mensagem);
    }
  }
}
