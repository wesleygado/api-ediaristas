import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'customAge', async: false })
export class IdadeValida implements ValidatorConstraintInterface {
  validate(nascimento: Date, args: ValidationArguments): boolean {
    nascimento = new Date(nascimento);
    return this.calculateAge(nascimento) > 17 &&
      this.calculateAge(nascimento) <= 100
      ? true
      : false;
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return 'A idade precisa ser entre 18 e 100 anos';
  }

  calculateAge(nascimento: Date): number {
    const dataAtual = new Date(Date.now());
    const diferencaEntreDatas = Math.abs(
      dataAtual.getTime() - nascimento.getTime(),
    );
    const diferencaEmAnos = Math.floor(
      diferencaEntreDatas / (1000 * 60 * 60 * 24 * 365),
    );
    return diferencaEmAnos;
  }
}
