import { Test, TestingModule } from '@nestjs/testing';
import { DentistsEducationService } from './dentists-education.service';

describe('DentistsEducationService', () => {
  let service: DentistsEducationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DentistsEducationService],
    }).compile();

    service = module.get<DentistsEducationService>(DentistsEducationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
