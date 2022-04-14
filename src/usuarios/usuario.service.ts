import { BadRequestException, ConsoleLogger, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioRequestDto } from './dtos/usuario-request.dto';
import { UsuarioCadastroResponseDto } from './dtos/usuario-cadastro-response.dto';
import { UsuarioMapper } from './usuario.mapper';
import { UsuarioRepository } from './usuario.repository';
import 'reflect-metadata';
import { FotoService } from 'src/fotos/foto.service';
import { ValidatorPasswordConfirmation } from 'src/core/validators/usuario/validator-password-confirmation';
import { Request } from 'express';
import { MailService } from 'src/mail/mail.service';
import { JwtTokens } from 'src/auth/strategies/jwt-tokens';
import { JwtPayload } from 'src/auth/strategies/jwt-payload.interface';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioRepository)
    private usuarioRepository: UsuarioRepository,
    private mapper: UsuarioMapper,
    private foto: FotoService,
    private validator: ValidatorPasswordConfirmation,
    private mailService: MailService,
    private jwtTokens: JwtTokens,
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
  ): Promise<UsuarioCadastroResponseDto> {
    this.validator.validarConfirmacaoDeSenha(
      usuarioRequestDto.password,
      usuarioRequestDto.passwordConfirmation,
    );

    await this.foto.salvar(file, req);
    const usuarioParaCadastrar =
      this.mapper.toUsuarioRequestDto(usuarioRequestDto);

    usuarioParaCadastrar.reputacao = await this.calcularReputacaoMedia(
      usuarioRequestDto.tipoUsuario,
    );

    const usuarioCadastrado = await this.usuarioRepository.createUser(
      usuarioParaCadastrar,
    );

    const usuarioCadastroDTO = await this.mapper.toUsuarioCadastroResponseDto(
      usuarioCadastrado,
    );

    const { email } = usuarioCadastrado;
    const payload: JwtPayload = { email };
    usuarioCadastroDTO.tokens = await this.jwtTokens.gerarTokens(payload);
    await this.mailService.enviarEmailDeConfirmacao(usuarioCadastrado);
    return usuarioCadastroDTO;
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
