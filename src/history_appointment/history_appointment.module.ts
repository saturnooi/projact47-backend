import { Module } from '@nestjs/common';
import { HistoryAppointmentService } from './history_appointment.service';
import { HistoryAppointmentController } from './history_appointment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryAppointment } from './entities/history_appointment.entity';
import { Patient } from 'src/patient/entities/patient.entity';
import { Dentist } from 'src/dentist/entities/dentist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HistoryAppointment,Patient,Dentist])],
  controllers: [HistoryAppointmentController],
  providers: [HistoryAppointmentService]
})
export class HistoryAppointmentModule {}
