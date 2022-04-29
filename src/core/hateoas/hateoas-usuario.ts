import { Injectable } from '@nestjs/common';
import { HateoasInterface, HateoasLinks } from './hateoas.interface';
import { HateoasBase } from './hateoas-base';
import { DiariasController } from 'src/diarias/diarias.controller';

@Injectable()
export class HateoasUsuario extends HateoasBase implements HateoasInterface {
  gerarLinksHateoas(tipoUsuario?: number): HateoasLinks[] {
    this.LINKS = [];

    if (tipoUsuario == 1) {
      this.adicionaLink(
        'POST',
        'cadastrar_diaria',
        DiariasController,
        DiariasController.prototype.cadastrar,
      );
    }

    return this.LINKS;
  }
}
