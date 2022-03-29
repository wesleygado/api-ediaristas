import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioRequestDto } from './dtos/usuario-request.dto';
import { UsuarioResponseDto } from './dtos/usuario-response.dto';
import { UsuarioMapper } from './usuario.mapper';
import { UsuarioRepository } from './usuario.repository';
import 'reflect-metadata';
import { UsuarioValidator } from 'src/core/validators/usuario-validators';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioRepository)
    private usuarioRepository: UsuarioRepository,
    private mapper: UsuarioMapper,
    private readonly usuarioValidator: UsuarioValidator,
  ) {}

  buscarDiaristasPorCep() {
    return this.usuarioRepository.getUsers();
  }

  async cadastrar(request: UsuarioRequestDto): Promise<UsuarioResponseDto> {
    const existeUsuarioEmail = await this.usuarioRepository.findOne({
      email: request.email,
    });

    const existeUsuarioCPF = await this.usuarioRepository.findOne({
      cpf: request.cpf,
    });

    const existeUsuarioPix = await this.usuarioRepository.findOne({
      chavePix: request.chavePix,
    });

    if (request.password !== request.passwordConfirmation) {
      throw new BadRequestException(`Senha não confere`);
    }

    if (existeUsuarioEmail !== undefined) {
      throw new BadRequestException(`Email já cadastrado`);
    }

    if (existeUsuarioCPF !== undefined) {
      throw new BadRequestException(`CPF já cadastrado`);
    }

    if (existeUsuarioPix !== undefined) {
      throw new BadRequestException(`Chave Pix já cadastrada`);
    }

    console.log(existeUsuarioCPF);
    const usuarioParaCadastrar = this.mapper.toUsuarioRequestDto(request);
    const usuarioCadastrado = await this.usuarioRepository.createUser(
      usuarioParaCadastrar,
    );

    return this.mapper.toUsuarioResponseDto(usuarioCadastrado);
  }
}
