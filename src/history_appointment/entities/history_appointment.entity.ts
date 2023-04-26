import { Dentist } from 'src/dentist/entities/dentist.entity';
import { Patient } from 'src/patient/entities/patient.entity';

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class HistoryAppointment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Patient, (patient) => patient.historyAppointment)
  @JoinColumn({ name: 'patient_id' })
  patient: Patient;

  @ManyToOne(() => Dentist, (dentist) => dentist.historyAppointment)
  @JoinColumn({ name: 'dentist_id' })
  dentist: Dentist;

  @Column()
  date_appoint: Date;

  @Column()
  detail: string;

  @Column()
  advise: string;

  @Column()
  confirm_review: number;
}
