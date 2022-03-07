import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Foto {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false, unique: true })
  filename: string;

  @Column({ name: 'content_length', nullable: false })
  contentLength: number;

  @Column({ name: 'content_type', nullable: false })
  contentType: string;

  @Column({ nullable: false })
  url: string;
}
