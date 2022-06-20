import { Injectable } from '@nestjs/common';
import { HateoasInterface, HateoasLinks } from './hateoas.interface';
import { HateoasBase } from './hateoas-base';
import { PagamentosController } from 'src/api/pagamentos/pagamentos.controller';
import DiariaStatus from 'src/api/diarias/enum/diaria-status';
import TipoUsuario from 'src/api/usuarios/enum/tipoUsuario-enum';
import { Diaria } from 'src/api/diarias/entities/diaria.entity';
import { DiariasController } from 'src/api/diarias/diarias.controller';
import { ConfirmacaoPresencaController } from '../services/confirmacao-presenca/confirmacao-presenca.controller';
import { UsuarioApi } from 'src/api/usuarios/entities/usuario.entity';
import { AvaliacaoController } from 'src/api/avaliacao/avaliacao.controller';
import { Avaliacao } from 'src/api/avaliacao/entities/avaliacao.entity';

@Injectable()
export class HateoasDiaria extends HateoasBase implements HateoasInterface {
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
      this.adicionaLink(
        'POST',
        'pagar_diaria',
        PagamentosController,
        PagamentosController.prototype.pagar,
        params,
      );
    }

    if (this.aptaParaConfirmacaoPresenca(diaria)) {
      this.adicionaLink(
        'PATCH',
        'confirmar_diarista',
        ConfirmacaoPresencaController,
        ConfirmacaoPresencaController.prototype.confirmacaoPresenca,
        params,
      );
    }

    this.adicionaLink(
      'GET',
      'self',
      DiariasController,
      DiariasController.prototype.buscarPorId,
      params,
    );

    if (this.isAptaParaAvaliacao(diaria, avaliacaoApta)) {
      this.adicionaLink(
        'PATCH',
        'avaliar_diaria',
        AvaliacaoController,
        AvaliacaoController.prototype.create,
        params,
      );
    }

    return this.LINKS;
  }

  private aptaParaConfirmacaoPresenca(diaria: Diaria): boolean {
    const hoje = new Date(Date.now());
    if (
      diaria.status === DiariaStatus.CONFIRMADO &&
      diaria.localDateTime < hoje
    ) {
      return true;
    }
    return false;
  }

  private isAptaParaAvaliacao(diaria: Diaria, avaliacaoApta: boolean) {
    return diaria.status === DiariaStatus.CONCLUIDO && !avaliacaoApta;
  }
}
