import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PasswordResetConfirmacaoRequestDto } from './dto/password-reset-confirmacao-request.dto';
import { PasswordResetRequestDto } from './dto/password-reset-request.dto';
import { PasswordResetService } from './password-reset.service';

@Controller('api/recuperar-senha')
export class PasswordResetController {
  constructor(private readonly passwordResetService: PasswordResetService) {}

  @Post()
  async solicitarResetDeSenha(
    @Body() request: PasswordResetRequestDto,
  ): Promise<{ mensagem: string }> {
    return await this.passwordResetService.solicitarResetDeSenha(request);
  }

  @Post('confirm')
  async confirmarResetDeSenha(
    @Body() request: PasswordResetConfirmacaoRequestDto,
  ): Promise<{ mensagem: string }> {
    return await this.passwordResetService.confirmarResetSenha(request);
  }
}
