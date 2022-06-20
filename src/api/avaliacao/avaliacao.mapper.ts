import { AvaliacaoResponseDto } from './dto/avaliacao-response.dto';
import { AvaliacaoRequestDto } from './dto/avaliacao-request.dto';
import { Avaliacao } from './entities/avaliacao.entity';

export class AvaliacaoMapper {
  toModel(avaliacaoRequest: AvaliacaoRequestDto): Avaliacao {
    const avaliacao = new Avaliacao();
    avaliacao.nota = avaliacaoRequest.nota;
    avaliacao.descricao = avaliacaoRequest.descricao;
    return avaliacao;
  }

  toResponse(avaliacao: Avaliacao): AvaliacaoResponseDto {
    const avaliacaoResponse = new AvaliacaoResponseDto();
    avaliacaoResponse.descricao = avaliacao.descricao;
    avaliacaoResponse.nota = avaliacao.nota;
    avaliacaoResponse.nomeAvaliador = avaliacao.avaliador.nomeCompleto;
    avaliacaoResponse.fotoAvaliador = null;
    return avaliacaoResponse;
  }
}
