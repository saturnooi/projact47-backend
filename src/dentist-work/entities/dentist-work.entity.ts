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

  @Column()
  @IsNotEmpty()
  dentistId: number;

  @ManyToOne(() => Dentist, (dentist) => dentist.works)
  @JoinColumn({ name: 'dentistId' })
  dentist: Dentist;

  @Column()

  startTime: Date;

  @Column()

  endTime: Date;

  @Column()
  dayOfWeek: number;

  @Column()
  repetition: string;
    

}
