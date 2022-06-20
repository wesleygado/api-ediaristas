import { BadRequestException, Injectable } from '@nestjs/common';
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
