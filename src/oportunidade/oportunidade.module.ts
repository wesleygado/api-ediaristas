import { Module } from '@nestjs/common';
import { OportunidadeService } from './oportunidade.service';
import { OportunidadeController } from './oportunidade.controller';
import { DiariaMapper } from 'src/diarias/diaria.mapper';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiariaRepository } from 'src/diarias/diaria.repository';
import { ServicoService } from 'src/servicos/servico.service';
import { ClienteMapper } from 'src/clientes/clienteMapper';
import { HateoasOportunidade } from 'src/core/hateoas/hateoas-oportunidade';
import { DiaristaMapper } from 'src/diaristas/diarista.mapper';
import { UsuarioRepository } from 'src/usuarios/usuario.repository';
import { HateoasDiaria } from 'src/core/hateoas/hateoas-diaria';
import { ServicoMapper } from 'src/servicos/servico.mapper';

@Module({
  imports: [
    TypeOrmModule.forFeature([DiariaRepository]),
    TypeOrmModule.forFeature([UsuarioRepository]),
  ],
  controllers: [OportunidadeController],
  providers: [
    OportunidadeService,
    HateoasOportunidade,
    DiariaMapper,
    ServicoService,
    ClienteMapper,
    DiaristaMapper,
    HateoasDiaria,
    ServicoMapper,
  ],
})
export class OportunidadeModule {}
