import { BadRequestException, Injectable } from '@nestjs/common';
import {
  isNumber,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ServicoService } from 'src/servicos/servico.service';

@ValidatorConstraint({ name: 'ServicoExiste', async: true })
@Injectable()
export class ServicoExiste implements ValidatorConstraintInterface {
  constructor(private readonly servicoService: ServicoService) {}

  async validate(servico: number) {
    if (servico === null || servico === undefined) {
      return false;
    }

    if (isNumber(servico) === false) {
      throw new BadRequestException('Serviço deve ser um número');
    }

    const existeServico = await this.servicoService.buscarServicoPorId(servico);
    return existeServico ? true : false;
  }

  defaultMessage() {
    return 'Serviço não existe';
  }
}
