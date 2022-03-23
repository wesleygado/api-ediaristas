import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { UsuarioRepository } from './usuario.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioMapper } from './usuario.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioRepository])],
  controllers: [UsuarioController],
  providers: [UsuarioService, UsuarioMapper],
})
export class UsuariosModule {}
