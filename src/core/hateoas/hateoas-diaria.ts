import { Injectable } from '@nestjs/common';
import { HateoasInterface, HateoasLinks } from './hateoas.interface';
import { HateoasBase } from './hateoas-base';
import { PagamentosController } from 'src/api/pagamentos/pagamentos.controller';
import DiariaStatus from 'src/api/diarias/enum/diaria-status';
import TipoUsuario from 'src/api/usuarios/enum/tipoUsuario-enum';
import { Diaria } from 'src/api/diarias/entities/diaria.entity';
import { DiariasController } from 'src/api/diarias/diarias.controller';
import { ConfirmacaoPresencaService } from '../services/confirmacao-presenca/confirmacao-presenca.service';
import { ConfirmacaoPresencaController } from '../services/confirmacao-presenca/confirmacao-presenca.controller';

@Injectable()
export class HateoasDiaria extends HateoasBase implements HateoasInterface {
  gerarLinksHateoas(tipoUsuario?: number, diaria?: Diaria): HateoasLinks[] {
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
}