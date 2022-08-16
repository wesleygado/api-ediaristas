import { Module } from '@nestjs/common';
import { OportunidadeService } from './oportunidade.service';
import { OportunidadeController } from './oportunidade.controller';
import { DiariaMapper } from 'src/api/diarias/diaria.mapper';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiariaRepository } from 'src/api/diarias/diaria.repository';
import { ServicoService } from 'src/api/servicos/servico.service';
import { ClienteMapper } from 'src/api/clientes/clienteMapper';
import { HateoasOportunidade } from 'src/core/hateoas/hateoas-oportunidade';
import { DiaristaMapper } from 'src/api/diaristas/diarista.mapper';
import { UsuarioRepository } from 'src/api/usuarios/usuario.repository';
import { HateoasDiaria } from 'src/core/hateoas/hateoas-diaria';
import { ServicoMapper } from 'src/api/servicos/servico.mapper';
import { ServicoRepository } from '../servicos/servico.repository';
import { AvaliacaoRepository } from '../avaliacao/avaliacao.repository';
import { AvaliacaoMapper } from '../avaliacao/avaliacao.mapper';
import { Avaliacao } from '../avaliacao/entities/avaliacao.entity';
import { Diaria } from '../diarias/entities/diaria.entity';
import { UsuarioApi } from '../usuarios/entities/usuario.entity';
import { Servico } from '../servicos/entities/services.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Diaria]),
    TypeOrmModule.forFeature([UsuarioApi]),
    TypeOrmModule.forFeature([Servico]),
    TypeOrmModule.forFeature([Avaliacao]),
  ],
  controllers: [OportunidadeController],
  providers: [
    ServicoRepository,
    UsuarioRepository,
    DiariaRepository,
    OportunidadeService,
    HateoasOportunidade,
    DiariaMapper,
    ServicoService,
    ClienteMapper,
    DiaristaMapper,
    HateoasDiaria,
    ServicoMapper,
    AvaliacaoMapper,
    AvaliacaoRepository,
  ],
})
export class OportunidadeModule {}
