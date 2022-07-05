import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DiariaRepository } from './diaria.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { DiariaMapper } from './diaria.mapper';
import { DiariaRequestDto } from './dto/diaria-request.dto';
import { ServicoService } from 'src/api/servicos/servico.service';
import { UsuarioApi } from 'src/api/usuarios/entities/usuario.entity';
import DiariaStatus from './enum/diaria-status';
import { HateoasDiaria } from 'src/core/hateoas/hateoas-diaria';
import TipoUsuario from 'src/api/usuarios/enum/tipoUsuario-enum';
import { DiariaResponseDto } from './dto/diaria-response.dto';
import { ServicoRepository } from '../servicos/servico.repository';
import { ValidatorDiaria } from 'src/core/validators/diaria/validator-diaria';
import { ValidatorDiariaUsuario } from 'src/core/validators/diaria/validator-diaria-usuario';
import { AvaliacaoRepository } from '../avaliacao/avaliacao.repository';
import { request } from 'http';
import { DiariaCancelamentoRequestDto } from './dto/diaria-cancelamento-request.dto';
import { Diaria } from './entities/diaria.entity';
import { GatewayPagamentoService } from 'src/core/services/getaway-pagamento/adapters/gateway-pagamento.service';
import { Avaliacao } from '../avaliacao/entities/avaliacao.entity';

@Injectable()
export class DiariasService {
  constructor(
    @InjectRepository(DiariaRepository)
    private diariaRepository: DiariaRepository,
    @InjectRepository(ServicoRepository)
    private servicoRepository: ServicoRepository,
    private diariaMapper: DiariaMapper,
    private servico: ServicoService,
    private hateOas: HateoasDiaria,
    private validatorDiaria: ValidatorDiaria,
    private validarUsuario: ValidatorDiariaUsuario,
    @InjectRepository(AvaliacaoRepository)
    private avalicaoRepository: AvaliacaoRepository,
    private gatewayPagamento: GatewayPagamentoService,
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

    console.log(diariaCadastrada);

    const diariaDtoResponse = await this.diariaMapper.toDiariaResponseDto(
      diariaCadastrada,
    );

    console.log(diariaDtoResponse);

    diariaDtoResponse.links = await this.hateOas.gerarLinksHateoas(
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
          if (!diaria.servico) {
            return null;
          }
          const avaliacao =
            await this.avalicaoRepository.findByAvaliadorAndDiaria(
              usuarioLogado,
              diaria,
            );
          const diariaDTO = await this.diariaMapper.toDiariaResponseDto(diaria);
          diariaDTO.links = await this.hateOas.gerarLinksHateoas(
            usuarioLogado.tipoUsuario,
            diaria,
            usuarioLogado,
            avaliacao,
          );
          return diariaDTO;
        }),
      );
    }
    if (usuarioLogado.tipoUsuario === TipoUsuario.DIARISTA) {
      const diarias = await this.diariaRepository.findByDiarista(usuarioLogado);
      return Promise.all(
        diarias.map(async (diaria) => {
          if (!diaria.servico) {
            return null;
          }
          const avaliacao =
            await this.avalicaoRepository.findByAvaliadorAndDiaria(
              usuarioLogado,
              diaria,
            );
          const diariaDTO = await this.diariaMapper.toDiariaResponseDto(diaria);
          diariaDTO.links = await this.hateOas.gerarLinksHateoas(
            usuarioLogado.tipoUsuario,
            diaria,
            usuarioLogado,
            avaliacao,
          );
          return diariaDTO;
        }),
      );
    }
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
    diariaDTO.links = await this.hateOas.gerarLinksHateoas(
      usuario.tipoUsuario,
      diaria,
    );

    this.validarUsuario.validarDiariaUsuario(usuario, diaria);
    return diariaDTO;
  }

  async listaDiarias() {
    return await this.diariaRepository.getAptasParaCancelamento();
  }

  async cancelar(
    diariaId: number,
    diariaCancelamentoRequestDto: DiariaCancelamentoRequestDto,
    usuarioLogado: UsuarioApi,
  ): Promise<{ mensagem: string }> {
    const diaria = await this.buscarDiariaPorId(diariaId);
    this.validarUsuario.validarDiariaUsuario(usuarioLogado, diaria);
    this.validatorDiaria.validarDiariaCancelamento(diaria);

    if (this.hasPenalizacao(diaria)) {
      this.aplicarPenalizacao(diaria, usuarioLogado);
    } else {
      this.gatewayPagamento.realizarEstornoTotal(diaria);
    }

    diaria.status = DiariaStatus.CANCELADO;
    diaria.movitoCancelamento = diariaCancelamentoRequestDto.motivoCancelamento;
    this.diariaRepository.save(diaria);

    return { mensagem: 'A diária foi cancelada com sucesso' };
  }

  private aplicarPenalizacao(diaria: Diaria, usuarioLogado: UsuarioApi) {
    if (usuarioLogado.tipoUsuario === TipoUsuario.DIARISTA) {
      this.penalizarDiarista(diaria);
      this.gatewayPagamento.realizarEstornoTotal(diaria);
    } else {
      this.gatewayPagamento.realizarEstornoParcial(diaria);
    }
  }
  private async penalizarDiarista(diaria: Diaria) {
    const avaliacao = new Avaliacao();
    avaliacao.nota = 1;
    avaliacao.descricao = 'Penalização por diária cancelada';
    avaliacao.avaliado = diaria.diarista;
    avaliacao.visibilidade = false;
    avaliacao.diaria = diaria;

    await this.avalicaoRepository.save(avaliacao);
  }

  private async buscarDiariaPorId(diariaId: number): Promise<Diaria> {
    const diaria = await this.diariaRepository.findOne(diariaId);

    if (!diaria) {
      throw new NotFoundException('Diária não encontrada');
    }

    return diaria;
  }

  private async calcularComissao(model: DiariaRequestDto): Promise<number> {
    const preco = model.preco;
    const porcentagemComissao = await (
      await this.servico.buscarServicoPorId(model.servico)
    ).porcentagem;
    return (preco * porcentagemComissao) / 100;
  }

  private hasPenalizacao(diaria: Diaria): boolean {
    const hoje = new Date(Date.now());
    const diferencaDatas = new Date(
      diaria.localDateTime.getTime() - hoje.getTime(),
    );
    const converterParaHoras = 3600000;
    const diferencaHoras = diferencaDatas.getTime() / converterParaHoras;

    if (diferencaHoras < 24) {
      return true;
    }

    return false;
  }
}
