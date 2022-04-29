import { Injectable } from '@nestjs/common';
import { DiariaRepository } from './diaria.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { DiariaMapper } from './diariaMapper';
import { DiariaRequestDto } from './dto/diaria-request.dto';
import { ServicoService } from 'src/servicos/servico.service';
import { UsuarioApi } from 'src/usuarios/entities/usuario.entity';
import { ClienteMapper } from 'src/clientes/clienteMapper';
import DiariaStatus from './enum/diaria-status';
import { ValidatorHoraAtendimento } from 'src/core/validators/diaria/validator-hora-atendimento';
import { ValidatorTempoAtendimento } from 'src/core/validators/diaria/validator-tempo-atendimento';
import { ValidatorPrecoDiaria } from 'src/core/validators/diaria/validator-preco-diaria';
import { ValidatorCep } from 'src/core/validators/diaria/validator-cep';
import { ValidatorIbge } from 'src/core/validators/diaria/validator-ibge';
import { ValidatorDisponibilidade } from 'src/core/validators/diaria/validator-disponibilidade';
import { HateoasDiaria } from 'src/core/hateoas/hateoas-diaria';

@Injectable()
export class DiariasService {
  constructor(
    @InjectRepository(DiariaRepository)
    private diariaRepository: DiariaRepository,
    private diariaMapper: DiariaMapper,
    private servico: ServicoService,
    private cliente: ClienteMapper,
    private validatorHora: ValidatorHoraAtendimento,
    private validatorTempo: ValidatorTempoAtendimento,
    private validatorPreco: ValidatorPrecoDiaria,
    private validatorCep: ValidatorCep,
    private validatorIbge: ValidatorIbge,
    private validatorDisponibilidade: ValidatorDisponibilidade,
    private hateOas: HateoasDiaria,
  ) {}

  async cadastrar(request: DiariaRequestDto, userRequest: UsuarioApi) {
    const diariaDTO = this.diariaMapper.toDiariaRequestDto(request);

    /* VALIDAÇÕES */
    this.validatorHora.validarHoraAtendimento(request, 22);
    diariaDTO.codigoIbge =
      await this.validatorDisponibilidade.validarDisponibilidade(request);
    diariaDTO.tempoAtendimento =
      await this.validatorTempo.validarTempoAtendimento(request);
    diariaDTO.preco = await this.validatorPreco.validarPrecoAtendimento(
      request,
    );
    diariaDTO.cep = await this.validatorCep.validarCep(request);
    diariaDTO.codigoIbge = await this.validatorIbge.validarIbge(request);
    /*---------*/

    diariaDTO.valorComissao = await this.calcularComissao(diariaDTO);
    diariaDTO.cliente = userRequest;
    diariaDTO.status = DiariaStatus.SEM_PAGAMENTO;

    const diariaCadastrada = await this.diariaRepository.createDiaria(
      diariaDTO,
    );

    diariaDTO.links = this.hateOas.gerarLinksHateoas(
      userRequest.tipoUsuario,
      diariaCadastrada,
    );

    const diariaDtoResponse = await this.diariaMapper.toDiariaResponseDto(
      diariaCadastrada,
    );

    diariaDtoResponse.links = diariaDTO.links;
    return diariaDtoResponse;
  }

  private async calcularComissao(model: DiariaRequestDto): Promise<number> {
    const preco = model.preco;
    const porcentagemComissao = await (
      await this.servico.buscarServicoPorId(model.servico)
    ).porcentagem;
    return (preco * porcentagemComissao) / 100;
  }
}
