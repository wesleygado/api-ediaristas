import { Injectable, NotFoundException } from '@nestjs/common';
import { NovaAvaliacaoEvent } from 'src/core/events/nova-avaliacao-event';
import { AvalicaoValidator } from 'src/core/validators/avaliacao/validator-avaliacao';
import { DiariaRepository } from '../diarias/diaria.repository';
import { UsuarioApi } from '../usuarios/entities/usuario.entity';
import TipoUsuario from '../usuarios/enum/tipoUsuario-enum';
import { AvaliacaoMapper } from './avaliacao.mapper';
import { AvaliacaoRepository } from './avaliacao.repository';
import { AvaliacaoRequestDto } from './dto/avaliacao-request.dto';
import { Avaliacao } from './entities/avaliacao.entity';

@Injectable()
export class AvaliacaoService {
  constructor(
    private readonly avaliacaoRepository: AvaliacaoRepository,
    private readonly diariaRepository: DiariaRepository,
    private readonly avaliacaoMappar: AvaliacaoMapper,
    private readonly avaliacaoValidator: AvalicaoValidator,
    private readonly avaliacaoEvent: NovaAvaliacaoEvent,
  ) {}

  async avaliarDiaria(
    avaliacaoRequest: AvaliacaoRequestDto,
    id: number,
    usuarioLogado: UsuarioApi,
  ): Promise<{ message: string }> {
    const diaria = await this.buscarDiariaPorId(id);

    const avaliador = usuarioLogado;

    const avaliacao = this.avaliacaoMappar.toModel(avaliacaoRequest);
    avaliacao.avaliador = avaliador;
    avaliacao.diaria = diaria;
    avaliacao.visibilidade = true;
    avaliacao.avaliado = this.getAvaliado(avaliacao);
    await this.avaliacaoValidator.validar(avaliacao, usuarioLogado, diaria);

    const atualizacaoCadastrada =
      await this.avaliacaoRepository.repository.save(avaliacao);
    this.avaliacaoEvent.NovaAvaliacaoEvent(atualizacaoCadastrada);

    return { message: 'Avaliação realizada com sucesso' };
  }

  private async buscarDiariaPorId(id: number) {
    const diaria = await this.diariaRepository.repository.findOneBy({ id: id });
    if (!diaria) {
      throw new NotFoundException('Diaria não encontrada');
    }
    return diaria;
  }

  private getAvaliado(model: Avaliacao) {
    if (model.avaliador.tipoUsuario === TipoUsuario.CLIENTE) {
      return model.diaria.diarista;
    }
    return model.diaria.cliente;
  }
}
