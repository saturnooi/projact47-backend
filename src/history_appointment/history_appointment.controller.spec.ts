import { Test, TestingModule } from '@nestjs/testing';
import { HistoryAppointmentController } from './history_appointment.controller';
import { HistoryAppointmentService } from './history_appointment.service';

describe('HistoryAppointmentController', () => {
  let controller: HistoryAppointmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistoryAppointmentController],
      providers: [HistoryAppointmentService],
    }).compile();

    controller = module.get<HistoryAppointmentController>(HistoryAppointmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
