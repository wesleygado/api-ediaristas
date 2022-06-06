import { Diaria } from 'src/api/diarias/entities/diaria.entity';
import { UsuarioApi } from 'src/api/usuarios/entities/usuario.entity';
import { Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export class Avaliacao {
  @PrimaryGeneratedColumn('increment');
  id: number;

  @Column({ nullable: false })
  descricao: string;

  @Column({ nullable: false })
  nota: string;

  @Column({ nullable: false })
  visibilidade: boolean;

  @ManyToOne(() => Diaria, (diaria) => diaria.id, {
    nullable: true,
    eager: true,
  })
  
  @JoinColumn({ name: 'diaria_id' })
  diaria: Diaria;

  avaliador: UsuarioApi;
  avaliado: UsuarioApi;
}
