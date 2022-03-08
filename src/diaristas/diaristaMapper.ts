/* import { InjectMapper, AutomapperProfile } from '@automapper/nestjs';
import type { Mapper } from '@automapper/types';
import { Injectable } from '@nestjs/common';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { DiaristaLocalidadeResponseDto } from './dto/diaristaLocalidadeResponse.dto';

@Injectable()
export class UserProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    // Pass 👇 the Mapper to the parent AutomapperProfile class
    super(mapper);
  }

  // 👇 implement mapProfile()
  // mapProfile() will be called automatically by AutomapperProfile abstract class
  mapProfile() {
    return (mapper) => {
      mapper.createMap(Usuario, DiaristaLocalidadeResponseDto);
    };
  }
} */
