import { Injectable } from '@nestjs/common';
import { HateoasInterface, HateoasLinks } from './hateoas.interface';
import { HateoasBase } from './hateoas-base';
import { Diaria } from 'src/api/diarias/entities/diaria.entity';
import { CandidaturaController } from 'src/api/candidaturas/candidatura.controller';
import { UsuarioController } from 'src/api/usuarios/usuario.controller';

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
