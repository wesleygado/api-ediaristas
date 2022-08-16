import { Injectable } from '@nestjs/common';
import { DiaristaController } from 'src/api/diaristas/diarista.controller';
import { ServicoController } from 'src/api/servicos/servico.controller';
import { HateoasLinks } from './hateoas.interface';
import { HateoasBase } from './hateoas-base';
import { AuthController } from 'src/auth/auth.controller';
import { MeController } from 'src/api/me/me.controller';
import { UsuarioController } from 'src/api/usuarios/usuario.controller';
import { EnderecoController } from 'src/api/consulta-endereco/endereco.controller';

@Injectable()
export class HateoasIndex extends HateoasBase {
  gerarLinksHateoas(): HateoasLinks[] {
    this.LINKS = [];

    this.adicionarLink(
      'GET',
      'diaristas_cidades',
      DiaristaController,
      DiaristaController.prototype.findByCep,
    );

    this.adicionarLink(
      'GET',
      'verificar_disponibilidade_atendimento',
      DiaristaController,
      DiaristaController.prototype.verificarDisponibilidadePorCep,
    );

    this.adicionarLink(
      'GET',
      'endereco_cep',
      EnderecoController,
      EnderecoController.prototype.buscarEnderecoPorCep,
    );

    this.adicionarLink(
      'GET',
      'listar_servicos',
      ServicoController,
      ServicoController.prototype.findAll,
    );

    this.adicionarLink(
      'POST',
      'cadastrar_usuario',
      UsuarioController,
      UsuarioController.prototype.create,
    );

    this.adicionarLink(
      'POST',
      'login',
      AuthController,
      AuthController.prototype.autenticar,
    );

    this.adicionarLink(
      'POST',
      'novo_token_com_refresh_token',
      AuthController,
      AuthController.prototype.reautenticar,
    );

    this.adicionarLink(
      'GET',
      'usuario_logado',
      MeController,
      MeController.prototype.me,
    );

    return this.LINKS;
  }
}
