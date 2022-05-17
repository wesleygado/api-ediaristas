import { Controller } from '@nestjs/common';
import { DiariaRequestDto } from 'src/api/diarias/dto/diaria-request.dto';
import { ClienteService } from './cliente.service';

@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}
}
