import { Injectable } from '@nestjs/common';
import { ClienteMapper } from 'src/clientes/clienteMapper';
import { ServicoService } from 'src/servicos/servico.service';
import { DiariaRequestDto } from './dto/diaria-request.dto';
import { DiariaResponseDto } from './dto/diaria-response.dto';
import { Diaria } from './entities/diaria.entity';

@Injectable()
export class DiariaMapper {
  constructor(
    private servico: ServicoService,
    private clienteMapper: ClienteMapper,
  ) {}
  toDiariaRequestDto(request: DiariaRequestDto) {
    const diariaDTO = request;
    return diariaDTO;
  }

  async toDiariaResponseDto(diaria: Diaria) {
    const servico = await this.servico.buscarServicoPorId(diaria.servico);
    const cliente = this.clienteMapper.toResponse(diaria.cliente);

    const diariaReponseDto = new DiariaResponseDto();
    diariaReponseDto.id = diaria.id;
    diariaReponseDto.status = diaria.status;
    diariaReponseDto.valorComissao = diaria.valorComissao;
    diariaReponseDto.motivoCancelamento = diaria.movitoCancelamento;
    diariaReponseDto.nomeServico = servico.name;
    diariaReponseDto.complemento = diaria.complemento;
    diariaReponseDto.dataAtendimento = diaria.localDateTime;
    diariaReponseDto.tempoAtendimento = diaria.tempoAtendimento;
    diariaReponseDto.preco = diaria.preco;
    diariaReponseDto.logradouro = diaria.logradouro;
    diariaReponseDto.numero = diaria.numero;
    diariaReponseDto.bairro = diaria.bairro;
    diariaReponseDto.estado = diaria.estado;
    diariaReponseDto.cidade = diaria.cidade;
    diariaReponseDto.codigoIbge = diaria.codigoIbge;
    diariaReponseDto.quantidadeBanheiros = diaria.quantidadeBanheiros;
    diariaReponseDto.quantidadeCozinhas = diaria.quantidadeCozinhas;
    diariaReponseDto.quantidadeOutros = diaria.quantidadeOutros;
    diariaReponseDto.quantidadeQuartos = diaria.quantidadeQuartos;
    diariaReponseDto.quantidadeQuintais = diaria.quantidadeQuintais;
    diariaReponseDto.quantidadeSalas = diaria.quantidadeSalas;
    diariaReponseDto.observacoes = diaria.observacoes;
    diariaReponseDto.servico = servico.id;
    diariaReponseDto.created_at = diaria.created_at;
    diariaReponseDto.updated_at = diaria.updated_at;
    diariaReponseDto.cliente = cliente;
    return diariaReponseDto;
  }
}
