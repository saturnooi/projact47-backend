import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ManageTool {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  img: string;

  @Column()
  type: string;

  @Column()
  company: string;

  @Column()
  price: string;

  @Column()
  unit: string;

  @Column()
  Description: string;
}
