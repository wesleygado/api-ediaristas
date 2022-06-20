import { EnderecoDiaristaResponseDto } from './dto/endereco-diarista-response.dto';
import { EnderecoDiarista } from './entities/endereco-diarista.entity';

export class EnderecoDiaristaMapper {
  toEnderecoDiaristaResponse(
    enderecoRequest: EnderecoDiarista,
  ): EnderecoDiaristaResponseDto {
    const enderecoResponse = new EnderecoDiaristaResponseDto();
    enderecoResponse.id = enderecoRequest.id;
    enderecoResponse.bairro = enderecoRequest.bairro;
    enderecoResponse.cep = enderecoRequest.cep;
    enderecoResponse.cidade = enderecoRequest.cidade;
    enderecoResponse.complemento = enderecoRequest.complemento;
    enderecoResponse.estado = enderecoRequest.estado;
    enderecoResponse.logradouro = enderecoRequest.logradouro;
    enderecoResponse.numero = enderecoRequest.numero;

    return enderecoResponse;
  }
}
