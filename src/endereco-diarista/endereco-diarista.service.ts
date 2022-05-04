import { Injectable } from '@nestjs/common';
import { EnderecoDiaristaRequestDto } from './dto/endereco-diarista-request.dto';

@Injectable()
export class EnderecoDiaristaService {
  create(createEnderecoDiaristaDto: EnderecoDiaristaRequestDto) {
    return 'This action adds a new enderecoDiarista';
  }
}
