import { Injectable } from '@nestjs/common';
import { HateoasInterface, HateoasLinks } from './hateoas.interface';
import { HateoasBase } from './hateoas-base';
import { PagamentosController } from 'src/pagamentos/pagamentos.controller';
import DiariaStatus from 'src/diarias/enum/diaria-status';
import TipoUsuario from 'src/usuarios/enum/tipoUsuario-enum';
import { Diaria } from 'src/diarias/entities/diaria.entity';
import { DiariasController } from 'src/diarias/diarias.controller';
import { CandidaturaController } from 'src/candidatura/candidatura.controller';

@Injectable()
export class HateoasOportunidade
  extends HateoasBase
  implements HateoasInterface
{
  gerarLinksHateoas(diaria?: Diaria): HateoasLinks[] {
    this.LINKS = [];

    const params = {
      id: diaria.id,
    };

    this.adicionaLink(
      'POST',
      'candidatar_diaria',
      CandidaturaController,
      CandidaturaController.prototype.candidatar,
      params,
    );

    return this.LINKS;
  }
}
