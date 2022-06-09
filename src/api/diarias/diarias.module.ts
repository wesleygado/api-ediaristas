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
import { ValidatorHoraAtendimento } from 'src/core/validators/diaria/validator-hora-atendimento';
import { ValidatorTempoAtendimento } from 'src/core/validators/diaria/validator-tempo-atendimento';
import { ValidatorPrecoDiaria } from 'src/core/validators/diaria/validator-preco-diaria';
import { ValidatorCep } from 'src/core/validators/diaria/validator-cep';
import { ViaCepService } from 'src/core/providers/via-cep.service';
import { ValidatorIbge } from 'src/core/validators/diaria/validator-ibge';
import { ValidatorDisponibilidade } from 'src/core/validators/diaria/validator-disponibilidade';
import { DiaristaRepository } from 'src/api/diaristas/diarista.repository';
import { HateoasDiaria } from 'src/core/hateoas/hateoas-diaria';
import { DiaristaMapper } from 'src/api/diaristas/diarista.mapper';
import { UsuarioRepository } from 'src/api/usuarios/usuario.repository';
import { ValidatorDiariaUsuario } from 'src/core/validators/diaria/validator-diaria-usuario';
import { ServicoRepository } from '../servicos/servico.repository';
import { ValidatorDiaria } from 'src/core/validators/diaria/validator-diaria';

@Module({
  imports: [
    TypeOrmModule.forFeature([DiariaRepository]),
    TypeOrmModule.forFeature([DiaristaRepository]),
    TypeOrmModule.forFeature([UsuarioRepository]),
    TypeOrmModule.forFeature([ServicoRepository]),
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
    ValidatorHoraAtendimento,
    ValidatorTempoAtendimento,
    ValidatorPrecoDiaria,
    ValidatorCep,
    ViaCepService,
    ValidatorIbge,
    ValidatorDisponibilidade,
    HateoasDiaria,
    DiaristaMapper,
    ValidatorDiariaUsuario,
    ValidatorDiaria,
  ],
})
export class DiariasModule {}