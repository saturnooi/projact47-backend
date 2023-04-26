import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HistoryAppointmentService } from './history_appointment.service';
import { CreateHistoryAppointmentDto } from './dto/create-history_appointment.dto';
import { UpdateHistoryAppointmentDto } from './dto/update-history_appointment.dto';

@Controller('history-appointment')
export class HistoryAppointmentController {
  constructor(private readonly historyAppointmentService: HistoryAppointmentService) {}

  @Post()
  create(@Body() createHistoryAppointmentDto: CreateHistoryAppointmentDto) {
    return this.historyAppointmentService.create(createHistoryAppointmentDto);
  }

  @Get()
  findAll() {
    return this.historyAppointmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historyAppointmentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHistoryAppointmentDto: UpdateHistoryAppointmentDto) {
    return this.historyAppointmentService.update(+id, updateHistoryAppointmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.historyAppointmentService.remove(+id);
  }
}
