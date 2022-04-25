import { UsuarioApi } from 'src/usuarios/entities/usuario.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CidadesAtendidas {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'codigo_ibge', nullable: false })
  codigoIbge: string;

  @Column({ nullable: false })
  cidade: string;

  @Column({ nullable: false })
  estado: string;

  @ManyToMany((type) => UsuarioApi)
  usuarios: UsuarioApi[];
}
