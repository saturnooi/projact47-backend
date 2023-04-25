import { Dentist } from 'src/dentist/entities/dentist.entity';

export class CreateDentistWorkDto {
  dentist: Dentist;
  time_start: Date;
  time_end: Date;
  repeatType: string = 'null';
}
