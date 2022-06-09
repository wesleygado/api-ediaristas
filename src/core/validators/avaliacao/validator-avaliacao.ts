import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AvaliacaoRepository } from 'src/api/avaliacao/avaliacao.repository';
import { Avaliacao } from 'src/api/avaliacao/entities/avaliacao.entity';
import { Diaria } from 'src/api/diarias/entities/diaria.entity';
import DiariaStatus from 'src/api/diarias/enum/diaria-status';
import { UsuarioApi } from 'src/api/usuarios/entities/usuario.entity';

export class AvalicaoValidator {
  constructor(
    @InjectRepository(AvaliacaoRepository)
    private readonly avaliacaoRepository: AvaliacaoRepository,
  ) {}
  async validar(
    avaliacao: Avaliacao,
    usuarioLogado: UsuarioApi,
    diaria: Diaria,
  ) {
    await this.validarUsuarioDiaria(usuarioLogado, diaria);
    await this.validarDiariaStatus(avaliacao);
    await this.validarDiariaDataAtendimento(avaliacao);
    await this.validarAvaliador(avaliacao);
  }

  private validarDiariaStatus(avaliacao: Avaliacao) {
    if (avaliacao.diaria.status !== DiariaStatus.CONCLUIDO) {
      const mensagem = 'Diária não está com o status Concluido!';
      throw new BadRequestException(mensagem);
    }
  }

  private validarDiariaDataAtendimento(avaliacao: Avaliacao) {
    const dataHoje = new Date(Date.now());
    const dataAtendimento = avaliacao.diaria.localDateTime;

    if (dataHoje < dataAtendimento) {
      const mensagem = 'Diária com data de atendimento no futuro!';
      throw new BadRequestException(mensagem);
    }
  }

  private async validarAvaliador(avaliacao: Avaliacao) {
    if (
      (
        await this.avaliacaoRepository.find({
          diaria: avaliacao.diaria,
          avaliador: avaliacao.avaliador,
        })
      ).length > 0
    ) {
      const mensagem = 'O Usuário já validou esta diária';
      throw new BadRequestException(mensagem);
    }
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
