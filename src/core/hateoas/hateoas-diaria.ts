import { Injectable } from '@nestjs/common';
import { HateoasLinks } from './hateoas.interface';
import { HateoasBase } from './hateoas-base';
import { PagamentosController } from 'src/api/pagamentos/pagamentos.controller';
import DiariaStatus from 'src/api/diarias/enum/diaria-status';
import TipoUsuario from 'src/api/usuarios/enum/tipoUsuario-enum';
import { Diaria } from 'src/api/diarias/entities/diaria.entity';
import { DiariasController } from 'src/api/diarias/diarias.controller';
import { ConfirmacaoPresencaController } from '../../api/confirmacao-presenca/confirmacao-presenca.controller';
import { UsuarioApi } from 'src/api/usuarios/entities/usuario.entity';
import { AvaliacaoController } from 'src/api/avaliacao/avaliacao.controller';

@Injectable()
export class HateoasDiaria extends HateoasBase {
  gerarLinksHateoas(
    tipoUsuario?: number,
    diaria?: Diaria,
    usuarioLogado?: UsuarioApi,
    avaliacaoApta?: boolean,
  ): HateoasLinks[] {
    this.LINKS = [];

    const params = {
      id: diaria.id,
    };

    if (
      tipoUsuario === TipoUsuario.CLIENTE &&
      diaria.status === DiariaStatus.SEM_PAGAMENTO
    ) {
      this.adicionarLink(
        'POST',
        'pagar_diaria',
        PagamentosController,
        PagamentosController.prototype.pagar,
        params,
      );
    }

    if (this.aptaParaConfirmacaoPresenca(diaria)) {
      this.adicionarLink(
        'PATCH',
        'confirmar_diarista',
        ConfirmacaoPresencaController,
        ConfirmacaoPresencaController.prototype.confirmacaoPresenca,
        params,
      );
    }

    this.adicionarLink(
      'GET',
      'self',
      DiariasController,
      DiariasController.prototype.buscarPorId,
      params,
    );

    if (this.isAptaParaAvaliacao(diaria, avaliacaoApta)) {
      this.adicionarLink(
        'PATCH',
        'avaliar_diaria',
        AvaliacaoController,
        AvaliacaoController.prototype.create,
        params,
      );
    }

    if (this.isAptaParaCancelamento(diaria)) {
      this.adicionarLink(
        'PATCH',
        'cancelar_diaria',
        DiariasController,
        DiariasController.prototype.cancelar,
        params,
      );
    }

    return this.LINKS;
  }

  private aptaParaConfirmacaoPresenca(diaria: Diaria): boolean {
    const hoje = new Date(Date.now());
    if (
      diaria.status === DiariaStatus.CONFIRMADO &&
      diaria.dataAtendimento < hoje
    ) {
      return true;
    }
    return false;
  }

  private isAptaParaAvaliacao(diaria: Diaria, avaliacaoApta: boolean) {
    return diaria.status === DiariaStatus.CONCLUIDO && !avaliacaoApta;
  }

  private isAptaParaCancelamento(diaria: Diaria) {
    const dataHoje = new Date(Date.now());
    if (
      (diaria.status === DiariaStatus.PAGO ||
        diaria.status === DiariaStatus.CONFIRMADO) &&
      diaria.dataAtendimento > dataHoje
    ) {
      return true;
    }
    return false;
  }
}
