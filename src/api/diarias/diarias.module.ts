import { Module } from '@nestjs/common';
import { DiariasService } from './diarias.service';
import { DiariasController } from './diarias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiariaRepository } from './diaria.repository';
import { DiariaMapper } from './diaria.mapper';
import { ServicoService } from 'src/api/servicos/servico.service';
import { ClienteMapper } from 'src/api/clientes/clienteMapper';
import { ServicoMapper } from 'src/api/servicos/servico.mapper';
import { ServicoExiste } from 'src/core/validators/diaria/validator-servico';
import { DataAtendimento } from 'src/core/validators/diaria/validator-data-atendimento';
import { ViaCepService } from 'src/core/providers/via-cep.service';
import { DiaristaRepository } from 'src/api/diaristas/diarista.repository';
import { HateoasDiaria } from 'src/core/hateoas/hateoas-diaria';
import { DiaristaMapper } from 'src/api/diaristas/diarista.mapper';
import { UsuarioRepository } from 'src/api/usuarios/usuario.repository';
import { ValidatorDiariaUsuario } from 'src/core/validators/diaria/validator-diaria-usuario';
import { ServicoRepository } from '../servicos/servico.repository';
import { ValidatorDiaria } from 'src/core/validators/diaria/validator-diaria';
import { AvaliacaoRepository } from '../avaliacao/avaliacao.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([DiariaRepository]),
    TypeOrmModule.forFeature([DiaristaRepository]),
    TypeOrmModule.forFeature([UsuarioRepository]),
    TypeOrmModule.forFeature([ServicoRepository]),
    TypeOrmModule.forFeature([AvaliacaoRepository]),
  ],
  controllers: [DiariasController],
  providers: [
    DiariasService,
    DiariaMapper,
    ServicoService,
    ClienteMapper,
    ServicoMapper,
    ServicoExiste,
    DataAtendimento,
    ViaCepService,
    HateoasDiaria,
    DiaristaMapper,
    ValidatorDiariaUsuario,
    ValidatorDiaria,
  ],
})
export class DiariasModule {}
