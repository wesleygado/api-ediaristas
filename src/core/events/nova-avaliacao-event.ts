import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { AvaliacaoRepository } from 'src/api/avaliacao/avaliacao.repository';
import { Avaliacao } from 'src/api/avaliacao/entities/avaliacao.entity';
import { DiariaRepository } from 'src/api/diarias/diaria.repository';
import DiariaStatus from 'src/api/diarias/enum/diaria-status';
import { UsuarioRepository } from 'src/api/usuarios/usuario.repository';

@Injectable()
export class NovaAvaliacaoEvent {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    @InjectRepository(AvaliacaoRepository)
    private readonly avaliacaoRepository: AvaliacaoRepository,
    @InjectRepository(UsuarioRepository)
    private readonly usuarioRepository: UsuarioRepository,
    @InjectRepository(DiariaRepository)
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
    const notaMedia = await this.avaliacaoRepository.getAvaliacaoMedia(
      avaliado,
    );
    avaliado.reputacao = notaMedia;
    this.usuarioRepository.save(avaliado);
  }

  private async atualizarStatusDaDiariaAvaliada(avaliacao: Avaliacao) {
    const diaria = avaliacao.diaria;
    console.log(
      await this.avaliacaoRepository.isClienteAndDiaristaAvaliaramDiaria(
        diaria,
      ),
    );
    if (
      await this.avaliacaoRepository.isClienteAndDiaristaAvaliaramDiaria(diaria)
    ) {
      diaria.status = DiariaStatus.AVALIADO;
      await this.diariaRepository.save(diaria);
    }
  }
}
