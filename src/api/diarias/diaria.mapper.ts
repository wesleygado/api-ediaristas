import { Injectable } from '@nestjs/common';
import { ClienteMapper } from 'src/api/clientes/clienteMapper';
import { DiaristaMapper } from 'src/api/diaristas/diarista.mapper';
import { DiariaRequestDto } from './dto/diaria-request.dto';
import { DiariaResponseDto } from './dto/diaria-response.dto';
import { Diaria } from './entities/diaria.entity';

@Injectable()
export class DiariaMapper {
  constructor(
    private clienteMapper: ClienteMapper,
    private diaristaMapper: DiaristaMapper,
  ) {}
  toDiariaRequestDto(request: DiariaRequestDto) {
    const diariaDTO = request;
    return diariaDTO;
  }

  async toDiariaResponseDto(diaria: Diaria) {
    const diariaReponseDto = new DiariaResponseDto();
    const cliente = this.clienteMapper.toResponse(diaria.cliente);
    const diariaDTO = this.diaristaMapper.toDiaristaDiariaResponseDto(
      diaria.diarista,
    );
    diariaReponseDto.id = diaria.id;
    diariaReponseDto.status = diaria.status;
    diariaReponseDto.valorComissao = diaria.valorComissao;
    diariaReponseDto.motivoCancelamento = diaria.movitoCancelamento;
    diariaReponseDto.nomeServico = diaria.servico.name;
    diariaReponseDto.complemento = diaria.complemento;
    diariaReponseDto.dataAtendimento = this.toGtm(diaria.dataAtendimento);
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
    diariaReponseDto.servico = diaria.servico.id;
    diariaReponseDto.created_at = diaria.created_at;
    diariaReponseDto.updated_at = diaria.updated_at;
    diariaReponseDto.cliente = cliente;
    diariaReponseDto.diarista = diariaDTO;
    return diariaReponseDto;
  }

  private toGtm(data: Date): Date {
    return new Date(data.valueOf() - data.getTimezoneOffset() * 60000);
  }
}
