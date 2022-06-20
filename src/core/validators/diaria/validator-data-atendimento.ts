import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

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
