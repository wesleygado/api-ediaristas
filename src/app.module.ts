import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuario.module';
import * as ormconfig from 'src/ormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FotoModule } from './fotos/foto.module';

@Module({
  imports: [UsuariosModule, TypeOrmModule.forRoot(ormconfig), FotoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
