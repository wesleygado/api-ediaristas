import { Injectable } from '@nestjs/common';
import { HateoasInterface, HateoasLinks } from './hateoas.interface';
import { HateoasBase } from './hateoas-base';
import { PagamentosController } from 'src/pagamentos/pagamentos.controller';
import DiariaStatus from 'src/diarias/enum/diaria-status';
import TipoUsuario from 'src/usuarios/enum/tipoUsuario-enum';
import { Diaria } from 'src/diarias/entities/diaria.entity';
import { DiariasController } from 'src/diarias/diarias.controller';

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

    this.adicionaLink(
      'GET',
      'self',
      DiariasController,
      DiariasController.prototype.buscarPorId,
      params,
    );

    return this.LINKS;
  }
}
