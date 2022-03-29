/* eslint-disable @typescript-eslint/no-unused-vars */
import { CidadesAtendidas } from 'src/cidades-atendidas/entities/cidades-atendidas.entity';
import { Foto } from 'src/fotos/entities/foto.entity';
import {
  BeforeInsert,
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
import * as bcrypt from 'bcrypt';
import { Expose } from 'class-transformer';

@Entity()
export class UsuarioApi {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'nome_completo' })
  @Expose({ name: 'nome_completo' })
  nomeCompleto: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  senha: string;

  @Column({
    name: 'tipo_usuario',
    nullable: false,
    type: 'enum',
    enum: TipoUsuario,
  })
  @Expose({ name: 'tipo_usuario' })
  tipoUsuario: TipoUsuario;

  @Column({ nullable: true, unique: true, length: 11 })
  cpf: string;

  @Column({ nullable: true })
  nascimento: Date;

  @Column({ nullable: true, length: 11 })
  telefone: string;

  @Column({ nullable: true })
  reputacao: number;

  @Column({ name: 'chave_pix', nullable: true, unique: true })
  chavePix: string;

  @OneToOne((type) => Foto, { nullable: true, eager: true })
  @JoinColumn({ name: 'foto_usuario' })
  fotoUsuario: Foto;

  @OneToOne((type) => Foto, { nullable: true, eager: true })
  @JoinColumn({ name: 'foto_documento' })
  fotoDocumento: Foto;

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

  @BeforeInsert()
  async setPassword(senha: string) {
    const salt = await bcrypt.genSalt();
    this.senha = await bcrypt.hash(senha || this.senha, salt);
  }
}
