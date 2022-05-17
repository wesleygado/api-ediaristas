import { BadRequestException, Injectable } from '@nestjs/common';
import {
  isNumber,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ServicoService } from 'src/api/servicos/servico.service';

@ValidatorConstraint({ name: 'dataAtendimento', async: true })
@Injectable()
export class DataAtendimento implements ValidatorConstraintInterface {
  horaInicio = 6;
  async validate(dataAtendimento: Date) {
    this.horaInicio = 6;
    const horaDataAtendimento = new Date(dataAtendimento).getHours();
    return horaDataAtendimento > this.horaInicio ? true : false;
  }

  defaultMessage() {
    return `Serviço deve iniciar após as ${this.horaInicio}AM`;
  }
}
