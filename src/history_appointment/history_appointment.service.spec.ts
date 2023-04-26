import { Test, TestingModule } from '@nestjs/testing';
import { HistoryAppointmentService } from './history_appointment.service';

describe('HistoryAppointmentService', () => {
  let service: HistoryAppointmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HistoryAppointmentService],
    }).compile();

    service = module.get<HistoryAppointmentService>(HistoryAppointmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
