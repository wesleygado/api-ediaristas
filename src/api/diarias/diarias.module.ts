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
import { ViaCepService } from 'src/core/services/via-cep.service';
import { DiaristaRepository } from 'src/api/diaristas/diarista.repository';
import { HateoasDiaria } from 'src/core/hateoas/hateoas-diaria';
import { DiaristaMapper } from 'src/api/diaristas/diarista.mapper';
import { UsuarioRepository } from 'src/api/usuarios/usuario.repository';
import { ValidatorDiariaUsuario } from 'src/core/validators/diaria/validator-diaria-usuario';
import { ServicoRepository } from '../servicos/servico.repository';
import { ValidatorDiaria } from 'src/core/validators/diaria/validator-diaria';
import { AvaliacaoRepository } from '../avaliacao/avaliacao.repository';
import { GatewayPagamentoService } from 'src/core/services/getaway-pagamento/adapters/gateway-pagamento.service';
import { PagarMeService } from 'src/core/services/getaway-pagamento/providers/pagarme.service';
import { PagamentoRepository } from '../pagamentos/pagamento.repository';
import { HateoasUsuario } from 'src/core/hateoas/hateoas-usuario';
import { Avaliacao } from '../avaliacao/entities/avaliacao.entity';
import { Diaria } from './entities/diaria.entity';
import { Servico } from '../servicos/entities/services.entity';
import { Pagamento } from '../pagamentos/entities/pagamento.entity';
import { UsuarioApi } from '../usuarios/entities/usuario.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Diaria]),
    TypeOrmModule.forFeature([UsuarioApi]),
    TypeOrmModule.forFeature([Servico]),
    TypeOrmModule.forFeature([Avaliacao]),
    TypeOrmModule.forFeature([Pagamento]),
  ],
  controllers: [DiariasController],
  providers: [
    DiaristaRepository,
    PagamentoRepository,
    ServicoRepository,
    HateoasUsuario,
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
    AvaliacaoRepository,
    DiariaRepository,
    {
      provide: GatewayPagamentoService,
      useClass: PagarMeService,
    },
  ],
  exports: [DiariaRepository],
})
export class DiariasModule {}
