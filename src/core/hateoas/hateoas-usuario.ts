import { Injectable } from '@nestjs/common';
import { HateoasInterface, HateoasLinks } from './hateoas.interface';
import { HateoasBase } from './hateoas-base';
import { DiariasController } from 'src/diarias/diarias.controller';
import TipoUsuario from 'src/usuarios/enum/tipoUsuario-enum';
import { EnderecoDiarista } from 'src/endereco-diarista/entities/endereco-diarista.entity';
import { EnderecoDiaristaController } from 'src/endereco-diarista/endereco-diarista.controller';

@Injectable()
export class HateoasUsuario extends HateoasBase implements HateoasInterface {
  gerarLinksHateoas(tipoUsuario?: number): HateoasLinks[] {
    this.LINKS = [];

    if (tipoUsuario == TipoUsuario.CLIENTE) {
      this.adicionaLink(
        'POST',
        'cadastrar_diaria',
        DiariasController,
        DiariasController.prototype.cadastrar,
      );
    }

    if (tipoUsuario == TipoUsuario.DIARISTA) {
      this.adicionaLink(
        'PUT',
        'Atualizar_endereço',
        EnderecoDiaristaController,
        EnderecoDiaristaController.prototype.atualizarEndereco,
      );

      this.adicionaLink(
        'GET',
        'exibir_endereço',
        EnderecoDiaristaController,
        EnderecoDiaristaController.prototype.exibirEndereco,
      );
    }

    this.adicionaLink(
      'GET',
      'listar_diárias_por_usuario_logado',
      DiariasController,
      DiariasController.prototype.listarDiarias,
    );

    return this.LINKS;
  }
}
