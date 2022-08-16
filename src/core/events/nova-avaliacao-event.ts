import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { AvaliacaoRepository } from 'src/api/avaliacao/avaliacao.repository';
import { Avaliacao } from 'src/api/avaliacao/entities/avaliacao.entity';
import { DiariaRepository } from 'src/api/diarias/diaria.repository';
import DiariaStatus from 'src/api/diarias/enum/diaria-status';
import { UsuarioRepository } from 'src/api/usuarios/usuario.repository';

@Injectable()
export class NovaAvaliacaoEvent {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly avaliacaoRepository: AvaliacaoRepository,
    private readonly usuarioRepository: UsuarioRepository,
    private readonly diariaRepository: DiariaRepository,
  ) {}

  NovaAvaliacaoEvent(avaliacao: Avaliacao) {
    this.eventEmitter.emit('avaliacao.created', avaliacao);
  }

  @OnEvent('avaliacao.created')
  SetNovaAvaliacao(payload: Avaliacao) {
    const avaliacao = payload;

    this.atualizarReputacaoAvaliado(avaliacao);
    this.atualizarStatusDaDiariaAvaliada(avaliacao);
  }

  private async atualizarReputacaoAvaliado(avaliacao: Avaliacao) {
    const avaliado = avaliacao.avaliado;
    const notaMedia =
      await this.avaliacaoRepository.repository.getAvaliacaoMedia(avaliado);
    avaliado.reputacao = notaMedia;
    this.usuarioRepository.repository.save(avaliado);
  }

  private async atualizarStatusDaDiariaAvaliada(avaliacao: Avaliacao) {
    const diaria = avaliacao.diaria;
    if (
      await this.avaliacaoRepository.repository.isClienteAndDiaristaAvaliaramDiaria(
        diaria,
      )
    ) {
      diaria.status = DiariaStatus.AVALIADO;
      await this.diariaRepository.repository.save(diaria);
    }
  }
}
