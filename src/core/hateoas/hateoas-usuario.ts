import { Injectable } from '@nestjs/common';
import { HateoasLinks } from './hateoas.interface';
import { HateoasBase } from './hateoas-base';
import { DiariasController } from 'src/api/diarias/diarias.controller';
import TipoUsuario from 'src/api/usuarios/enum/tipoUsuario-enum';
import { EnderecoDiaristaController } from 'src/api/endereco-diarista/endereco-diarista.controller';
import { CidadesAtendidasController } from 'src/api/cidades-atendidas/cidades-atendidas.controller';
import { OportunidadeController } from 'src/api/oportunidade/oportunidade.controller';
import { PagamentosController } from 'src/api/pagamentos/pagamentos.controller';
import { UsuarioController } from 'src/api/usuarios/usuario.controller';

@Injectable()
export class HateoasUsuario extends HateoasBase {
  gerarLinksHateoas(tipoUsuario?: number): HateoasLinks[] {
    this.LINKS = [];

    if (tipoUsuario === TipoUsuario.CLIENTE) {
      this.adicionarLink(
        'POST',
        'cadastrar_diaria',
        DiariasController,
        DiariasController.prototype.cadastrar,
      );
    }

    if (tipoUsuario === TipoUsuario.DIARISTA) {
      this.adicionarLink(
        'PUT',
        'cadastrar_endereco',
        EnderecoDiaristaController,
        EnderecoDiaristaController.prototype.atualizarEndereco,
      );

      this.adicionarLink(
        'GET',
        'listar_endereco',
        EnderecoDiaristaController,
        EnderecoDiaristaController.prototype.exibirEndereco,
      );

      this.adicionarLink(
        'PUT',
        'relacionar_cidades',
        CidadesAtendidasController,
        CidadesAtendidasController.prototype.atualizarCidadesAtendidas,
      );

      this.adicionarLink(
        'GET',
        'listar_cidades',
        CidadesAtendidasController,
        CidadesAtendidasController.prototype.listarCidadesAtendidas,
      );

      this.adicionarLink(
        'GET',
        'lista_oportunidades',
        OportunidadeController,
        OportunidadeController.prototype.buscarOportunidades,
      );

      this.adicionarLink(
        'GET',
        'lista_pagamentos',
        PagamentosController,
        PagamentosController.prototype.listarPagamentos,
      );
    }

    this.adicionarLink(
      'GET',
      'lista_diarias',
      DiariasController,
      DiariasController.prototype.listarDiarias,
    );

    this.adicionarLink(
      'POST',
      'alterar_foto_usuario',
      UsuarioController,
      UsuarioController.prototype.atualizarFotoUsuario,
    );

    this.adicionarLink(
      'PUT',
      'editar_usuario',
      UsuarioController,
      UsuarioController.prototype.atualizar,
    );

    return this.LINKS;
  }
}
