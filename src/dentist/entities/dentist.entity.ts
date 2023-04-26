import { DentistWork } from 'src/dentist-work/entities/dentist-work.entity';
import { DentistsEducation } from 'src/dentists-education/entities/dentists-education.entity';
import { HistoryAppointment } from 'src/history_appointment/entities/history_appointment.entity';
import { Queue } from 'src/queue/entities/queue.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Dentist {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  username: string;
  @Column()
  password: string;
  @Column()
  img: string;
  @Column()
  email: string;
  @Column()
  card_id: string;
  @Column()
  prefix: string;
  @Column()
  first_name: string;
  @Column()
  last_name: string;
  @Column()
  phone_number: string;
  @Column()
  nationality: string;
  @Column()
  ethnicity: string;
  @Column()
  birthday: Date;
  @Column()
  address: string;
  @Column()
  sex: string;

  @OneToMany(() => DentistsEducation, (education) => education.dentist)
  dentistsEducation: DentistsEducation[];

  @OneToMany(() => DentistWork, (work) => work.dentist)
  works: DentistWork[];

  @OneToMany(() => Queue, (queue) => queue.dentist)
  queues: Queue[];

  @OneToMany(() =>  HistoryAppointment, (historyAppointment) => historyAppointment.dentist)
  historyAppointment: HistoryAppointment[];
}
