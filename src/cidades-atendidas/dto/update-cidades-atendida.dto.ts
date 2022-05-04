import { PartialType } from '@nestjs/mapped-types';
import { CreateCidadesAtendidasDto } from './create-cidades-atendida.dto';

export class UpdateCidadesAtendidasDto extends PartialType(
  CreateCidadesAtendidasDto,
) {}
