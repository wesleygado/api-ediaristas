import { Injectable } from '@nestjs/common';
import { HateoasLinks } from './hateoas.interface';
import { HateoasBase } from './hateoas-base';
import { Diaria } from 'src/api/diarias/entities/diaria.entity';
import { CandidaturaController } from 'src/api/candidaturas/candidatura.controller';

@Injectable()
export class HateoasOportunidade extends HateoasBase {
  gerarLinksHateoas(diaria?: Diaria): HateoasLinks[] {
    this.LINKS = [];

    const params = {
      id: diaria.id,
    };

    this.adicionarLink(
      'POST',
      'candidatar_diaria',
      CandidaturaController,
      CandidaturaController.prototype.candidatar,
      params,
    );

    return this.LINKS;
  }
}
