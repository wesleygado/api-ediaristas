import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioRequestDto } from './dtos/usuario-request.dto';
import { UsuarioResponseDto } from './dtos/usuario-response.dto';
import { UsuarioMapper } from './usuario.mapper';
import { UsuarioRepository } from './usuario.repository';
import 'reflect-metadata';
import { FotoService } from 'src/fotos/foto.service';
import { ValidatorPasswordConfirmation } from 'src/core/validators/usuario/validator-password-confirmation';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioRepository)
    private usuarioRepository: UsuarioRepository,
    private mapper: UsuarioMapper,
    private foto: FotoService,
    private validator: ValidatorPasswordConfirmation,
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
    request: UsuarioRequestDto,
    file: Express.Multer.File,
  ): Promise<UsuarioResponseDto> {
    this.validator.validarConfirmacaoDeSenha(
      request.password,
      request.passwordConfirmation,
    );

    const foto = await this.foto.salvar(file);
    const usuarioParaCadastrar = this.mapper.toUsuarioRequestDto(request, foto);
    const usuarioCadastrado = await this.usuarioRepository.createUser(
      usuarioParaCadastrar,
    );

    return this.mapper.toUsuarioResponseDto(usuarioCadastrado);
  }
}
