import { Module } from '@nestjs/common';
import { DiariasService } from './diarias.service';
import { DiariasController } from './diarias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiariaRepository } from './diaria.repository';
import { DiaristaMapper } from 'src/diaristas/diarista.mapper';
import { DiariaMapper } from './diariaMapper';
import { ServicoService } from 'src/servicos/servico.service';
import { ClienteMapper } from 'src/clientes/clienteMapper';
import { ServicoMapper } from 'src/servicos/servico.mapper';
import { ServicoExiste } from 'src/core/validators/diaria/validator-servico';
import { DataAtendimento } from 'src/core/validators/diaria/validator-data-atendimento';
import { ValidatorHoraAtendimento } from 'src/core/validators/diaria/validator-hora-atendimento';
import { ValidatorTempoAtendimento } from 'src/core/validators/diaria/validator-tempo-atendimento';
import { ValidatorPrecoDiaria } from 'src/core/validators/diaria/validator-preco-diaria';
import { ValidatorCep } from 'src/core/validators/diaria/validator-cep';
import { ViaCepService } from 'src/core/providers/via-cep.service';
import { ValidatorIbge } from 'src/core/validators/diaria/validator-ibge';

@Module({
  imports: [TypeOrmModule.forFeature([DiariaRepository])],
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
  ],
})
export class DiariasModule {}
