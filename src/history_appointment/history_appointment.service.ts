import { Injectable } from '@nestjs/common';
import { CreateHistoryAppointmentDto } from './dto/create-history_appointment.dto';
import { UpdateHistoryAppointmentDto } from './dto/update-history_appointment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HistoryAppointment } from './entities/history_appointment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HistoryAppointmentService {
  constructor(
    @InjectRepository(HistoryAppointment)
    private historyAppointmentRepository: Repository<HistoryAppointment>,
  ) {}

  async create(createHistoryAppointmentDto: CreateHistoryAppointmentDto) {
    // console.log(createHistoryAppointmentDto);
    // const data = await this.historyAppointmentRepository.create(
    //   createHistoryAppointmentDto,
    // );
    // console.log(data);
    // return data
    return this.historyAppointmentRepository.save(createHistoryAppointmentDto);
  }

  findAll() {
    return this.historyAppointmentRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} historyAppointment`;
  }

  update(id: number, updateHistoryAppointmentDto: UpdateHistoryAppointmentDto) {
    return this.historyAppointmentRepository.update(
      id,
      updateHistoryAppointmentDto,
    );
  }

  remove(id: number) {
    this.historyAppointmentRepository.delete(id);
    return `This action removes a #${id} historyAppointment`;
  }
}
