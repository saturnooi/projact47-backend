import { Test, TestingModule } from '@nestjs/testing';
import { DentistWorkService } from './dentist-work.service';

describe('DentistWorkService', () => {
  let service: DentistWorkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DentistWorkService],
    }).compile();

    service = module.get<DentistWorkService>(DentistWorkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
