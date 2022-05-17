import { BadRequestException, Injectable } from '@nestjs/common';
import { ViaCepService } from 'src/core/providers/via-cep.service';
import { DiariaRequestDto } from 'src/api/diarias/dto/diaria-request.dto';
import { ServicoService } from 'src/api/servicos/servico.service';

@Injectable()
export class ValidatorCep {
  constructor(private readonly validatorCep: ViaCepService) {}

  async validarCep(diaria: DiariaRequestDto) {
    const cep = diaria.cep;

    try {
      await this.validatorCep.buscarEnderecoPorCep(cep);
      return diaria.cep;
    } catch (error) {
      throw new BadRequestException('CEP Inválido');
    }
  }
}
