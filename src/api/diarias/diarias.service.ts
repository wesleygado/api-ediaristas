import { BadRequestException, Injectable } from '@nestjs/common';
import { DiariaRepository } from './diaria.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { DiariaMapper } from './diaria.mapper';
import { DiariaRequestDto } from './dto/diaria-request.dto';
import { ServicoService } from 'src/api/servicos/servico.service';
import { UsuarioApi } from 'src/api/usuarios/entities/usuario.entity';
import { ClienteMapper } from 'src/api/clientes/clienteMapper';
import DiariaStatus from './enum/diaria-status';
import { ValidatorHoraAtendimento } from 'src/core/validators/diaria/validator-hora-atendimento';
import { ValidatorTempoAtendimento } from 'src/core/validators/diaria/validator-tempo-atendimento';
import { ValidatorPrecoDiaria } from 'src/core/validators/diaria/validator-preco-diaria';
import { ValidatorCep } from 'src/core/validators/diaria/validator-cep';
import { ValidatorIbge } from 'src/core/validators/diaria/validator-ibge';
import { ValidatorDisponibilidade } from 'src/core/validators/diaria/validator-disponibilidade';
import { HateoasDiaria } from 'src/core/hateoas/hateoas-diaria';
import TipoUsuario from 'src/api/usuarios/enum/tipoUsuario-enum';
import { DiariaResponseDto } from './dto/diaria-response.dto';
import { ServicoRepository } from '../servicos/servico.repository';
import { ValidatorDiaria } from 'src/core/validators/diaria/validator-diaria';
import { ValidatorDiariaUsuario } from 'src/core/validators/diaria/validator-diaria-usuario';

@Injectable()
export class DiariasService {
  constructor(
    @InjectRepository(DiariaRepository)
    private diariaRepository: DiariaRepository,
    @InjectRepository(ServicoRepository)
    private servicoRepository: ServicoRepository,
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
    private validatorDiaria: ValidatorDiaria,
    private validarUsuario: ValidatorDiariaUsuario,
  ) {}

  async cadastrar(
    diariaDTO: DiariaRequestDto,
    userRequest: UsuarioApi,
  ): Promise<DiariaResponseDto> {
    const servico = await this.servicoRepository.findOne(diariaDTO.servico);
    await this.validatorDiaria.validarDiaria(diariaDTO, 22);

    diariaDTO.valorComissao = await this.calcularComissao(diariaDTO);
    diariaDTO.cliente = userRequest;
    diariaDTO.status = DiariaStatus.SEM_PAGAMENTO;

    const diariaCadastrada = await this.diariaRepository.createDiaria(
      diariaDTO,
      servico,
    );

    const diariaDtoResponse = await this.diariaMapper.toDiariaResponseDto(
      diariaCadastrada,
    );

    diariaDtoResponse.links = this.hateOas.gerarLinksHateoas(
      userRequest.tipoUsuario,
      diariaCadastrada,
    );
    return diariaDtoResponse;
  }

  async listarPorUsuarioLogado(usuarioLogado: UsuarioApi) {
    if (usuarioLogado.tipoUsuario === TipoUsuario.CLIENTE) {
      const diarias = await this.diariaRepository.findByCliente(usuarioLogado);
      return Promise.all(
        diarias.map(async (diaria) => {
          const diariaDTO = await this.diariaMapper.toDiariaResponseDto(diaria);
          diariaDTO.links = this.hateOas.gerarLinksHateoas(
            usuarioLogado.tipoUsuario,
            diaria,
          );
          return diariaDTO;
        }),
      );
    }
    const diarias = await this.diariaRepository.findByDiarista(usuarioLogado);
    return Promise.all(
      diarias.map(async (diaria) => {
        const diariaDTO = await this.diariaMapper.toDiariaResponseDto(diaria);
        diariaDTO.links = this.hateOas.gerarLinksHateoas(
          usuarioLogado.tipoUsuario,
          diaria,
        );
        return diariaDTO;
      }),
    );
  }

  async buscarPorId(
    id: number,
    usuario: UsuarioApi,
  ): Promise<DiariaResponseDto> {
    const diaria = await this.diariaRepository.findOne({ id: id });
    if (!diaria) {
      throw new BadRequestException(`Diária com Id:${id} não encontrada`);
    }
    const diariaDTO = await this.diariaMapper.toDiariaResponseDto(diaria);
    diariaDTO.links = this.hateOas.gerarLinksHateoas(
      usuario.tipoUsuario,
      diaria,
    );
    return this.validarUsuario.validarDiariaUsuario(usuario, diariaDTO);
  }

  private async calcularComissao(model: DiariaRequestDto): Promise<number> {
    const preco = model.preco;
    const porcentagemComissao = await (
      await this.servico.buscarServicoPorId(model.servico)
    ).porcentagem;
    return (preco * porcentagemComissao) / 100;
  }
}
