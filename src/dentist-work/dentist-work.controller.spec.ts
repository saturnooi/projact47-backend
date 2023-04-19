import { Test, TestingModule } from '@nestjs/testing';
import { DentistWorkController } from './dentist-work.controller';
import { DentistWorkService } from './dentist-work.service';

describe('DentistWorkController', () => {
  let controller: DentistWorkController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DentistWorkController],
      providers: [DentistWorkService],
    }).compile();

    controller = module.get<DentistWorkController>(DentistWorkController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
