import { IsNotEmpty, IsDateString } from 'class-validator';

export class CreateQueueDto {
  @IsNotEmpty()
  patientId: number;

  @IsNotEmpty()
  @IsDateString()
  timeStart: Date;

  @IsNotEmpty()
  @IsDateString()
  timeEnd: Date;

  @IsNotEmpty()
  symptom: string;

  @IsNotEmpty()
  status: string;
}
