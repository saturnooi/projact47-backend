import { Dentist } from 'src/dentist/entities/dentist.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class DentistsEducation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  year: number;

  @Column()
  major: string;

  @Column()
  university: string;

  @Column()
  dentistId: number;

  @ManyToOne(() => Dentist, (dentist) => dentist, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  dentist: Dentist;
}
