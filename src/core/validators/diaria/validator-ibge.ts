import { BadRequestException, Injectable } from '@nestjs/common';
import { ViaCepService } from 'src/core/providers/via-cep.service';
import { DiariaRequestDto } from 'src/api/diarias/dto/diaria-request.dto';

@Injectable()
export class ValidatorIbge {
  constructor(private readonly validatorCep: ViaCepService) {}

  async validarIbge(diaria: DiariaRequestDto) {
    const cep = diaria.cep;
    const codigoIbge = diaria.codigoIbge;

    // eslint-disable-next-line prettier/prettier
    const codigoIbgeValido = (await this.validatorCep.buscarEnderecoPorCep(cep))
      .ibge;

    if (codigoIbge !== codigoIbgeValido) {
      throw new BadRequestException('Ibge inválido');
    }

    return codigoIbge;
  }
}
