import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { UsuarioRepository } from './usuario.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioMapper } from './usuario.mapper';
import { UsuarioValidator } from 'src/core/validators/usuario-validators';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioRepository])],
  controllers: [UsuarioController],
  providers: [UsuarioService, UsuarioMapper, UsuarioValidator],
})
export class UsuariosModule {}
