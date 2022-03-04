import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import TipoUsuario from '../enum/tipoUsuario-enum';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'nome_completo', nullable: false })
  nomeCompleto: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  senha: string;

  @Column({ nullable: false })
  tipoUsuario: TipoUsuario;

  @Column({ nullable: false })
  cpf: string;

  @Column({ nullable: false })
  nascimento: Date;

  @Column({ nullable: false })
  telefone: string;

  @Column()
  reputacao: number;

  @Column()
  chavePix: string;

  /*@Column()
  fotoUsuario: Foto;

  @Column()
  fotoDocumento: Foto;

  cidadesAtendidas: CidadeAtendida[]; */

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;
}
