import { PartialType } from '@nestjs/mapped-types';
import { CreateCandidaturaDto } from './create-candidatura.dto';

export class UpdateCandidaturaDto extends PartialType(CreateCandidaturaDto) {}
