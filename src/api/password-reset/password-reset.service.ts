import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioRepository } from '../usuarios/usuario.repository';
import { PasswordResetRepository } from './password-reset.repository';
import { PasswordReset } from './entities/password-reset.entity';
import { randomUUID } from 'crypto';
import { PasswordResetRequestDto } from './dto/password-reset-request.dto';
import { MailService } from 'src/core/services/mail/mail.service';
import { PasswordResetConfirmacaoRequestDto } from './dto/password-reset-confirmacao-request.dto';

@Injectable()
export class PasswordResetService {
  constructor(
    private passwordRepository: PasswordResetRepository,
    private usuarioRepository: UsuarioRepository,
    private mailService: MailService,
  ) {}
  async criarPasswordReset(email: string): Promise<PasswordReset> {
    if (
      (await this.usuarioRepository.repository.findBy({ email: email }))
        .length > 0
    ) {
      const passwordReset = new PasswordReset();
      passwordReset.email = email;
      passwordReset.token = randomUUID();
      return await this.passwordRepository.repository.save(passwordReset);
    }
    return null;
  }

  async resetarSenha(passwordResetToken: string, novaSenha: string) {
    const passwordReset = await this.buscarPasswordResetPorToken(
      passwordResetToken,
    );
    const usuario = await this.usuarioRepository.repository.findOneBy({
      email: passwordReset.email,
    });
    await usuario.setPassword(novaSenha);
    await this.usuarioRepository.repository.save(usuario);
    await this.passwordRepository.repository.delete(passwordReset.id);
  }
  private async buscarPasswordResetPorToken(passwordResetToken: string) {
    const passwordReset = await this.passwordRepository.repository.findOneBy({
      token: passwordResetToken,
    });
    if (!passwordReset) {
      throw new NotFoundException();
    }
    return passwordReset;
  }

  async solicitarResetDeSenha(
    request: PasswordResetRequestDto,
  ): Promise<{ mensagem: string }> {
    const passwordReset = await this.criarPasswordReset(request.email);
    if (passwordReset != null) {
      await this.mailService.enviarEmailDeResetDeSenha(passwordReset);
    }
    return {
      mensagem: 'Verifique o link de reset de senha em seu email cadastrado',
    };
  }

  async confirmarResetSenha(
    request: PasswordResetConfirmacaoRequestDto,
  ): Promise<{ mensagem: string }> {
    await this.validarConfirmacaoSenha(request);
    await this.resetarSenha(request.token, request.password);

    return { mensagem: 'Senha alterada com sucesso' };
  }
  private validarConfirmacaoSenha(request: PasswordResetConfirmacaoRequestDto) {
    const senha = request.password;
    const confirmacaoSenha = request.passwordConfirmation;

    if (senha != confirmacaoSenha) {
      throw new BadRequestException({
        senha: 'Os campos de senha não conferem ',
      });
    }
  }
}
