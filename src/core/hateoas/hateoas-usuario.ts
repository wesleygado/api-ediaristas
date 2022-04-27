import { Injectable } from '@nestjs/common';
import { EnderecoController } from 'src/consulta-endereco/endereco.controller';
import { DiaristaController } from 'src/diaristas/diarista.controller';
import { ServicoController } from 'src/servicos/servico.controller';
import { HateoasInterface, HateoasLinks } from './hateoas.interface';
import { HateoasBase } from './hateoas-base';
import { UsuarioController } from 'src/usuarios/usuario.controller';
import { AuthController } from 'src/auth/auth.controller';
import { MeController } from 'src/me/me.controller';
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
