import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Queue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  patientId: number;

  @Column()
  employeeId: number;

  @Column()
  time_start: Date;

  @Column()
  time_end: Date;

  @Column()
  symtom: string;

  @Column()
  status: string;
}
