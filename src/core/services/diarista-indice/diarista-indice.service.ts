/* eslint-disable no-var */
import { BadRequestException, Injectable } from '@nestjs/common';
import { CidadeAtendidaRequestDto } from 'src/api/cidades-atendidas/dto/cidade-atendida-request.dto';
import { Diaria } from 'src/api/diarias/entities/diaria.entity';
import { UsuarioApi } from 'src/api/usuarios/entities/usuario.entity';
import { ConsultaDistanciaInterface } from '../consulta-distancia/consulta-distancia.interface';
import { GoogleMatrixService } from '../consulta-distancia/providers/google-matrix.service';
import { DiaristaServiceInterface } from './providers/diarista-service.interface';

@Injectable()
export class DiaristaIndiceService implements DiaristaServiceInterface {
  constructor(private readonly consultaDistanciaService: GoogleMatrixService) {}
  async selecionarMelhorDiarista(diaria: Diaria): Promise<UsuarioApi> {
    this.validatorDiaria(diaria);
    return await this.calculoMelhorCandidato(diaria, diaria.cep);
  }

  private async calculoMelhorCandidato(diaria: Diaria, destino: string) {
    let maiorIndice = 0;
    let melhorCandidato: UsuarioApi;
    for (let i = 0; i < diaria.candidatos.length; i++) {
      const indiceCanditatoAtual = await this.calcularIndice(
        diaria.candidatos[i],
        destino,
      );

      if (indiceCanditatoAtual > maiorIndice) {
        melhorCandidato = diaria.candidatos[i];
        maiorIndice = indiceCanditatoAtual;
      }
    }
    return melhorCandidato;
  }

  private validatorDiaria(diaria: Diaria) {
    if (diaria.candidatos.length <= 0) {
      throw new BadRequestException(
        'A lista de candidatos da diária não pode estar vazia',
      );
    }
  }

  private getCandidatoCep(candidato: UsuarioApi) {
    if (!candidato.endereco) {
      throw new BadRequestException(
        'Todos os candidatos da diária devem possuir um endereço',
      );
    }
    return candidato.endereco.cep;
  }

  private async getDistancia(destino: string, origem: string) {
    try {
      const googleMatrix =
        await this.consultaDistanciaService.calcularDistanciaEntreDoisCeps(
          origem,
          destino,
        );
      return googleMatrix.distanciaEmKm;
    } catch (error) {
      console.log(error + ` origem: ${origem} destino: ${destino}`);
    }
  }

  private async calcularIndice(candidato: UsuarioApi, destino: string) {
    const origem = this.getCandidatoCep(candidato);
    const distancia = await this.getDistancia(destino, origem);
    const reputacao = candidato.reputacao;

    return (reputacao - distancia / 10.0) / 2.0;
  }
}
