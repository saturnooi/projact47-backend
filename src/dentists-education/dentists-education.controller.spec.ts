import { Test, TestingModule } from '@nestjs/testing';
import { DentistsEducationController } from './dentists-education.controller';
import { DentistsEducationService } from './dentists-education.service';

describe('DentistsEducationController', () => {
  let controller: DentistsEducationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DentistsEducationController],
      providers: [DentistsEducationService],
    }).compile();

    controller = module.get<DentistsEducationController>(DentistsEducationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
