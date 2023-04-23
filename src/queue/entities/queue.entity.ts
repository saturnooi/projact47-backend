import { Dentist } from 'src/dentist/entities/dentist.entity';
import { Patient } from 'src/patient/entities/patient.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Queue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  time_start: Date;

  @Column()
  time_end: Date;

  @Column()
  symtom: string;

  @Column()
  status: string;

  @ManyToOne(() => Patient, (patient) => patient.queues)
  @JoinColumn({ name: 'patientId' })
  patient: Patient;

  @ManyToOne(() => Dentist, (dentist) => dentist.queues, { nullable: true })
  @JoinColumn({ name: 'dentistId' })
  dentist: Dentist;
}
