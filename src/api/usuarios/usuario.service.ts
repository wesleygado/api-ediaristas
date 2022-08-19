import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { UsuarioRequestDto } from './dtos/usuario-request.dto';
import { UsuarioCadastroResponseDto } from './dtos/usuario-cadastro-response.dto';
import { UsuarioMapper } from './usuario.mapper';
import { UsuarioRepository } from './usuario.repository';
import 'reflect-metadata';
import { FotoService } from 'src/api/fotos/foto.service';
import { ValidatorPasswordConfirmation } from 'src/core/validators/usuario/validator-password-confirmation';
import { MailService } from 'src/core/services/mail/mail.service';
import { JwtTokens } from 'src/auth/strategies/jwt-tokens';
import { JwtPayload } from 'src/auth/strategies/jwt-payload.interface';
import { HateoasUsuario } from 'src/core/hateoas/hateoas-usuario';
import { UsuarioApi } from './entities/usuario.entity';
import * as fs from 'fs/promises';
import { UsuarioAtualizarRequest } from './dtos/usuario-atualizar-request.dto';
import * as bcrypt from 'bcrypt';
import { link } from 'fs';
import { HateoasLinks } from 'src/core/hateoas/hateoas.interface';

@Injectable()
export class UsuarioService {
  constructor(
    private usuarioRepository: UsuarioRepository,
    private mapper: UsuarioMapper,
    private foto: FotoService,
    private validator: ValidatorPasswordConfirmation,
    private mailService: MailService,
    private jwtTokens: JwtTokens,
  ) {}

  buscarDiaristasPorCep() {
    return this.usuarioRepository.repository.getUsers();
  }

  async buscarPorEmail(email: string) {
    const existeUsuario = await this.usuarioRepository.repository.findOneBy({
      email: email,
    });

    return existeUsuario;
  }

  async cadastrar(
    usuarioRequestDto: UsuarioRequestDto,
    file: Express.Multer.File,
    req: Request,
  ): Promise<UsuarioCadastroResponseDto> {
    this.validator.validarConfirmacaoDeSenha(
      usuarioRequestDto.password,
      usuarioRequestDto.passwordConfirmation,
    );
    const foto = await this.foto.salvar(file, req);
    const usuarioParaCadastrar = this.mapper.toUsuarioRequestDto(
      usuarioRequestDto,
      foto,
    );

    usuarioParaCadastrar.reputacao = await this.calcularReputacaoMedia(
      usuarioRequestDto.tipoUsuario,
    );

    const usuarioCadastrado =
      await this.usuarioRepository.repository.createUser(usuarioParaCadastrar);

    const usuarioCadastroDTO = await this.mapper.toUsuarioCadastroResponseDto(
      usuarioCadastrado,
    );

    const { email } = usuarioCadastrado;
    const payload: JwtPayload = { email };
    usuarioCadastroDTO.token = await this.jwtTokens.gerarTokens(payload);
    /*     await this.mailService.enviarEmailDeConfirmacao(usuarioCadastrado);*/
    return usuarioCadastroDTO;
  }

  async calcularReputacaoMedia(tipoUsuario): Promise<number> {
    let reputacaoMedia =
      await this.usuarioRepository.repository.getMediaReputacaoDiarista(
        tipoUsuario,
      );

    if (reputacaoMedia === null || reputacaoMedia === 0.0) {
      reputacaoMedia = 5;
    }
    return reputacaoMedia;
  }

  async atualizarFotoUsuario(
    file: Express.Multer.File,
    usuarioLogado: UsuarioApi,
    req: Request,
  ): Promise<{ mensagem: string }> {
    if (!usuarioLogado.fotoUsuario) {
      const foto = await this.foto.salvar(file, req);
      usuarioLogado.fotoUsuario = foto;
      await this.usuarioRepository.repository.save(usuarioLogado);
      return { mensagem: 'Foto Salva com Sucesso' };
    } else {
      const fotoId = usuarioLogado.fotoUsuario.id;
      const fotoName = usuarioLogado.fotoUsuario.fileName;
      const foto = await this.foto.salvar(file, req);
      usuarioLogado.fotoUsuario = foto;
      await this.usuarioRepository.repository.save(usuarioLogado);
      await this.apagarFotoDesatualizada(fotoName, fotoId);
      return { mensagem: 'Foto Atualizada com Sucesso' };
    }
  }

  async atualizar(
    atualizarUsuarioRequest: UsuarioAtualizarRequest,
    usuarioLogado: UsuarioApi,
  ): Promise<{ message: string }> {
    this.atualizarInformacoesUsuarioLogado(
      atualizarUsuarioRequest,
      usuarioLogado,
    );
    await this.atualizarSenha(atualizarUsuarioRequest, usuarioLogado);

    await this.usuarioRepository.repository.save(usuarioLogado);

    return { message: 'Usuário Atualizado com Sucesso' };
  }
  private async atualizarSenha(
    atualizarUsuarioRequest: UsuarioAtualizarRequest,
    usuarioLogado: UsuarioApi,
  ) {
    const hasSenhas =
      atualizarUsuarioRequest.password &&
      atualizarUsuarioRequest.newPassword &&
      atualizarUsuarioRequest.passwordConfirmation;

    if (hasSenhas) {
      await this.verificarSenha(atualizarUsuarioRequest, usuarioLogado);
      this.validator.validarConfirmacaoDeSenha(
        atualizarUsuarioRequest.newPassword,
        atualizarUsuarioRequest.passwordConfirmation,
      );
      const novaSenha = atualizarUsuarioRequest.newPassword;
      await usuarioLogado.setPassword(novaSenha);
    }
  }
  private async verificarSenha(
    atualizarUsuarioRequest: UsuarioAtualizarRequest,
    usuarioLogado: UsuarioApi,
  ) {
    const senhaRequest = atualizarUsuarioRequest.password;
    const senhaDB = usuarioLogado.senha;

    if (!(await bcrypt.compare(senhaRequest, senhaDB))) {
      const mensagem = 'A senha informada está incorreta';
      throw new BadRequestException(mensagem);
    }
  }

  private atualizarInformacoesUsuarioLogado(
    usuarioAtualizado: UsuarioAtualizarRequest,
    usuarioLogado: UsuarioApi,
  ) {
    usuarioLogado.nomeCompleto = !usuarioAtualizado.nomeCompleto
      ? usuarioLogado.nomeCompleto
      : usuarioAtualizado.nomeCompleto;

    usuarioLogado.nomeCompleto = !usuarioAtualizado.chavePix
      ? usuarioLogado.nomeCompleto
      : usuarioAtualizado.nomeCompleto;

    usuarioLogado.cpf = !usuarioAtualizado.cpf
      ? usuarioLogado.cpf
      : usuarioAtualizado.cpf;

    usuarioLogado.email = !usuarioAtualizado.email
      ? usuarioLogado.email
      : usuarioAtualizado.email;

    usuarioLogado.nascimento = !usuarioAtualizado.nascimento
      ? usuarioLogado.nascimento
      : usuarioAtualizado.nascimento;

    usuarioLogado.telefone = !usuarioAtualizado.telefone
      ? usuarioLogado.telefone
      : usuarioAtualizado.telefone;
  }

  private async apagarFotoDesatualizada(
    fotoName: string,
    fotoId: number,
  ): Promise<void> {
    try {
      if (!fotoId) return null;
      await fs.unlink(
        `D:/TreinaWeb/ediaristas/api-ediaristas/public/images/${fotoName}`,
      );
      await this.foto.deletar(fotoId);
    } catch (error) {
      throw new BadRequestException(
        'Problemas ao excluir foto desatualizada do usuário',
      );
    }
  }
}
