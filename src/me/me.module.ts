import { Module } from '@nestjs/common';
import { MeService } from './me.service';
import { MeController } from './me.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioRepository } from 'src/usuarios/usuario.repository';
import { UsuarioMapper } from 'src/usuarios/usuario.mapper';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsuarioRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [MeController],
  providers: [MeService, UsuarioMapper],
})
export class MeModule {}
