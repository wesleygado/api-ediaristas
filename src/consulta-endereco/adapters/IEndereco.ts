import { EnderecoResponse } from '../dtos/endereco-response.dto';

export abstract class IEndereco {
  abstract buscarEnderecoPorCep(cep: string): Promise<EnderecoResponse>;
}
