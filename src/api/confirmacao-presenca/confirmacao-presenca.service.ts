import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DiariaRepository } from 'src/api/diarias/diaria.repository';
import DiariaStatus from 'src/api/diarias/enum/diaria-status';
import { UsuarioApi } from 'src/api/usuarios/entities/usuario.entity';
import { ValidatorConfirmacaoDiaria } from 'src/core/validators/confirmacao-diaria/validator-confirmacao-diaria';

@Injectable()
export class ConfirmacaoPresencaService {
  constructor(
    private readonly diariaRepository: DiariaRepository,
    private readonly validator: ValidatorConfirmacaoDiaria,
  ) {}

  async confirmacaoPresenca(
    id: number,
    usuario: UsuarioApi,
  ): Promise<{ mensagem: string }> {
    const diaria = await this.buscarDiariaPorId(id);
    await this.validator.validarDonoDaDiaria(usuario.id, diaria.cliente.id);
    await this.validator.validarStatusConfirmado(diaria);
    await this.validator.validarDataPassadoDiaria(diaria);
    await this.validator.validarDiariaDiarista(diaria);

    diaria.status = DiariaStatus.CONCLUIDO;
    await this.diariaRepository.repository.save(diaria);
    return { mensagem: 'Presença confirmada com sucesso' };
  }

  private async buscarDiariaPorId(id: number) {
    const diaria = await this.diariaRepository.repository.findOneBy({ id: id });
    if (!diaria) {
      throw new NotFoundException(`Diária de ID: ${id} não encontrada.`);
    }
    return diaria;
  }

  private async validarDonoDaDiaria(
    idCliente: number,
    idClienteDiaria: number,
  ) {
    if (idCliente !== idClienteDiaria) {
      throw new ForbiddenException('Acesso Negado');
    }
  }
}
