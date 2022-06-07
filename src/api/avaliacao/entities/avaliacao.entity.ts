import { Diaria } from 'src/api/diarias/entities/diaria.entity';
import { UsuarioApi } from 'src/api/usuarios/entities/usuario.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Avaliacao {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false })
  descricao: string;

  @Column({ nullable: false })
  nota: number;

  @Column({ nullable: false })
  visibilidade: boolean;

  @ManyToOne(() => Diaria, (diaria) => diaria.id, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'diaria_id' })
  diaria: Diaria;

  @ManyToOne(() => UsuarioApi, (usuario) => usuario.id, {
    nullable: true,
    eager: true,
  })
  @JoinColumn({ name: 'avaliador_id' })
  avaliador: UsuarioApi;

  @ManyToOne(() => UsuarioApi, (usuario) => usuario.id, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'avaliado_id' })
  avaliado: UsuarioApi;
}
