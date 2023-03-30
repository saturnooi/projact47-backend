import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  topic: string;

  @Column()
  img: string;

  @Column()
  content: string;

  @CreateDateColumn({ name: 'created_at' })
  create_at: Date;
}
