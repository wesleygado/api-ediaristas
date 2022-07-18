import { Injectable } from '@nestjs/common';
import { EnderecoController } from 'src/core/services/consulta-endereco/endereco.controller';
import { DiaristaController } from 'src/api/diaristas/diarista.controller';
import { ServicoController } from 'src/api/servicos/servico.controller';
import { HateoasInterface, HateoasLinks } from './hateoas.interface';
import { HateoasBase } from './hateoas-base';
import { AuthController } from 'src/auth/auth.controller';
import { MeController } from 'src/api/me/me.controller';
import { UsuarioController } from 'src/api/usuarios/usuario.controller';

@Injectable()
export class HateoasIndex extends HateoasBase implements HateoasInterface {
  gerarLinksHateoas(): HateoasLinks[] {
    this.LINKS = [];

    this.adicionaLink(
      'GET',
      'diaristas_cidades',
      DiaristaController,
      DiaristaController.prototype.findByCep,
    );

    this.adicionaLink(
      'GET',
      'verificar_disponibilidade_atendimento',
      DiaristaController,
      DiaristaController.prototype.verificarDisponibilidadePorCep,
    );

    this.adicionaLink(
      'GET',
      'endereco_cep',
      EnderecoController,
      EnderecoController.prototype.buscarEnderecoPorCep,
    );

    this.adicionaLink(
      'GET',
      'listar_servicos',
      ServicoController,
      ServicoController.prototype.findAll,
    );

    this.adicionaLink(
      'POST',
      'cadastrar_usuario',
      UsuarioController,
      UsuarioController.prototype.create,
    );

    this.adicionaLink(
      'POST',
      'login',
      AuthController,
      AuthController.prototype.autenticar,
    );

    this.adicionaLink(
      'POST',
      'novo_token_com_refresh_token',
      AuthController,
      AuthController.prototype.reautenticar,
    );

    this.adicionaLink(
      'GET',
      'usuario_logado',
      MeController,
      MeController.prototype.me,
    );

    return this.LINKS;
  }
}
