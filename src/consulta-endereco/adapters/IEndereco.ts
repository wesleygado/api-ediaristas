import { EnderecoResponse } from '../dtos/enderecoResponse.dto';

export abstract class IEndereco {
  abstract buscarEnderecoPorCep(cep: string): Promise<EnderecoResponse>;
}
