/* eslint-disable @typescript-eslint/no-unused-vars */
import { CidadesAtendidas } from 'src/cidades-atendidas/entities/cidades-atendidas.entity';
import { Foto } from 'src/fotos/entities/foto.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
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

  @Column({ nullable: false, type: 'enum', enum: TipoUsuario })
  tipoUsuario: TipoUsuario;

  @Column({ nullable: true, unique: true, length: 11 })
  cpf: string;

  @Column({ nullable: true })
  nascimento: Date;

  @Column({ nullable: true, length: 11 })
  telefone: string;

  @Column({ nullable: true })
  reputacao: number;

  @Column({ name: 'chave_pix', nullable: true })
  chavePix: string;

  @OneToOne((type) => Foto, { nullable: true })
  @JoinColumn({ name: 'foto_usuario' })
  fotoUsuario: Promise<Foto>;

  @OneToOne((type) => Foto, { nullable: true })
  @JoinColumn({ name: 'foto_documento' })
  fotoDocumento: Promise<Foto>;

  @ManyToMany(
    (type) => CidadesAtendidas,
    (cidadesAtendidas) => cidadesAtendidas.usuarios,
  )
  @JoinTable({ name: 'cidades_atendidas_usuarios' })
  cidadesAtendidas: CidadesAtendidas[];

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
