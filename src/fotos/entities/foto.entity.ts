import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Expose } from 'class-transformer';

@Entity()
export class Foto {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'file_name', nullable: false, unique: true })
  @Expose({ name: 'file_name' })
  fileName: string;

  @Column({ name: 'content_length', nullable: false })
  @Expose({ name: 'content_lenght' })
  contentLength: number;

  @Column({ name: 'content_type', nullable: false })
  @Expose({ name: 'content_type' })
  contentType: string;

  @Column({ nullable: false })
  url: string;
}
