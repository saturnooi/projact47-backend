import { PartialType } from '@nestjs/mapped-types';
import { CreateHistoryAppointmentDto } from './create-history_appointment.dto';

export class UpdateHistoryAppointmentDto extends PartialType(CreateHistoryAppointmentDto) {}
