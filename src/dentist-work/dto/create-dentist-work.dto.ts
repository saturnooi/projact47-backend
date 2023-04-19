import { Dentist } from 'src/dentist/entities/dentist.entity';

export class CreateDentistWorkDto {
  readonly dayOfWeek: number;
  readonly startTime: Date;
  readonly endTime: Date;
  readonly repetition: string;
  readonly dentistId: number;
}
