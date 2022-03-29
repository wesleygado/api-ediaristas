import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { UsuarioRepository } from './usuario.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioMapper } from './usuario.mapper';
import { UsuarioValidator } from 'src/core/validators/usuario-validators';
import { FotoService } from 'src/fotos/foto.service';
import { FotoRepository } from 'src/fotos/foto.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsuarioRepository]),
    TypeOrmModule.forFeature([FotoRepository]),
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService, UsuarioMapper, UsuarioValidator, FotoService],
})
export class UsuariosModule {}
