import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioRequestDto } from './dtos/usuario-request.dto';
import { UsuarioResponseDto } from './dtos/usuario-response.dto';
import { UsuarioMapper } from './usuario.mapper';
import { UsuarioRepository } from './usuario.repository';
import 'reflect-metadata';
import { FotoService } from 'src/fotos/foto.service';
import { ValidatorPasswordConfirmation } from 'src/core/validators/usuario/validator-password-confirmation';
import { Request } from 'express';
import TipoUsuario from './enum/tipoUsuario-enum';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioRepository)
    private usuarioRepository: UsuarioRepository,
    private mapper: UsuarioMapper,
    private foto: FotoService,
    private validator: ValidatorPasswordConfirmation,
    private mailService: MailService,
  ) {}

  buscarDiaristasPorCep() {
    return this.usuarioRepository.getUsers();
  }

  async buscarPorEmail(email: string) {
    const existeUsuario = await this.usuarioRepository.findOne({
      email: email,
    });

    return existeUsuario;
  }

  async cadastrar(
    usuarioRequestDto: UsuarioRequestDto,
    file: Express.Multer.File,
    req: Request,
  ): Promise<UsuarioResponseDto> {
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

    const usuarioCadastrado = await this.usuarioRepository.createUser(
      usuarioParaCadastrar,
    );
    await this.mailService.enviarEmailDeConfirmacao(usuarioCadastrado);
    return this.mapper.toUsuarioResponseDto(usuarioCadastrado);
  }

  async calcularReputacaoMedia(tipoUsuario): Promise<number> {
    let reputacaoMedia = await this.usuarioRepository.getMediaReputacaoDiarista(
      tipoUsuario,
    );

    if (reputacaoMedia === null || reputacaoMedia === 0.0) {
      reputacaoMedia = 5;
    }
    return reputacaoMedia;
  }
}
