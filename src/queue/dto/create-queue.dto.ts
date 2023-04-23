export class CreateQueueDto {
  patientId?: number;
  employeeId: number;
  time_start: Date;
  time_end: Date;
  symtom: string;
  status: string;
}
