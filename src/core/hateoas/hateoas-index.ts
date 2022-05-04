import { Injectable } from '@nestjs/common';
import { EnderecoController } from 'src/consulta-endereco/endereco.controller';
import { DiaristaController } from 'src/diaristas/diarista.controller';
import { ServicoController } from 'src/servicos/servico.controller';
import { HateoasInterface, HateoasLinks } from './hateoas.interface';
import { HateoasBase } from './hateoas-base';
import { UsuarioController } from 'src/usuarios/usuario.controller';
import { AuthController } from 'src/auth/auth.controller';
import { MeController } from 'src/me/me.controller';

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
