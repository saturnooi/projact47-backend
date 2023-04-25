import { IsDateString, IsEnum, IsNotEmpty } from 'class-validator';

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Dentist } from 'src/dentist/entities/dentist.entity';


@Entity()
export class DentistWork {
  @PrimaryGeneratedColumn()
  id: number;


  @ManyToOne(() => Dentist, (dentist) => dentist.works)
  @JoinColumn({ name: 'dentistId' })
  dentist: Dentist;

  @Column()

  time_start: Date;

  @Column()

  time_end: Date;

  @Column({ default: 'null' })
  repeatType: string;

}
