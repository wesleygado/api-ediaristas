import { Injectable } from '@nestjs/common';
import { Diaria } from 'src/api/diarias/entities/diaria.entity';
import { Pagamento } from 'src/api/pagamentos/entities/pagamento.entity';
import { UsuarioApi } from 'src/api/usuarios/entities/usuario.entity';

export abstract class GatewayPagamentoService {
  abstract pagar(diaria: Diaria, cardHash: string): Promise<Pagamento>;
}
