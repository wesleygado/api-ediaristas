import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EnderecoDiaristaService } from './endereco-diarista.service';

@Controller('endereco-diarista')
export class EnderecoDiaristaController {
  constructor(
    private readonly enderecoDiaristaService: EnderecoDiaristaService,
  ) {}

  @Post()
  create() {
    //
  }
}
