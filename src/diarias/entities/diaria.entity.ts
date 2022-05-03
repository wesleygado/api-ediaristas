import { IsOptional } from 'class-validator';
import { UsuarioApi } from 'src/usuarios/entities/usuario.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  Not,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import DiariaStatus from '../enum/diaria-status';

@Entity()
export class Diaria {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'data_atendimento', nullable: false })
  localDateTime: Date;

  @Column({ name: 'tempo_atendimento', nullable: false })
  tempoAtendimento: number;

  @Column('int', { nullable: false })
  status: DiariaStatus;

  @Column({ nullable: false })
  preco: number;

  @Column({ name: 'valor_comissao', nullable: false })
  valorComissao: number;

  @Column({ nullable: false })
  logradouro: string;

  @Column({ nullable: false })
  numero: number;

  @Column({ nullable: false })
  bairro: string;

  @Column({ nullable: true })
  complemento: string;

  @Column({ nullable: false })
  cidade: string;

  @Column({ nullable: false })
  estado: string;

  @Column({ nullable: false })
  cep: string;

  @Column({ name: 'codigo_ibge', nullable: false })
  codigoIbge: string;

  @Column({ name: 'quantidade_quartos', nullable: false })
  quantidadeQuartos: number;

  @Column({ name: 'quantidade_salas', nullable: false })
  quantidadeSalas: number;

  @Column({ name: 'quantidade_cozinhas', nullable: false })
  quantidadeCozinhas: number;

  @Column({ name: 'quantidade_banheiros', nullable: false })
  quantidadeBanheiros: number;

  @Column({ name: 'quantidade_quintas', nullable: false })
  quantidadeQuintais: number;

  @Column({ name: 'quantidade_outros', nullable: false })
  quantidadeOutros: number;

  @Column({ nullable: true })
  observacoes: string;

  @IsOptional()
  @Column({ name: 'motivo_cancelamento', nullable: true })
  movitoCancelamento: string;

  @ManyToOne(() => UsuarioApi, (cliente) => cliente.id, { nullable: false })
  @JoinColumn({ name: 'cliente_id' })
  cliente: UsuarioApi;

  @ManyToOne(() => UsuarioApi, (diarista) => diarista.id, {
    nullable: true,
    eager: true,
  })
  @JoinColumn({ name: 'diarista_id' })
  diarista: UsuarioApi;

  @Column({ nullable: false })
  servico: number;

  @ManyToMany((type) => UsuarioApi)
  @JoinTable({
    name: 'diaria_candidato',
  })
  candidatos: UsuarioApi[];

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
