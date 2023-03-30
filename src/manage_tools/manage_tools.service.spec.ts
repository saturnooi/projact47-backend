import { Test, TestingModule } from '@nestjs/testing';
import { ManageToolsService } from './manage_tools.service';

describe('ManageToolsService', () => {
  let service: ManageToolsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManageToolsService],
    }).compile();

    service = module.get<ManageToolsService>(ManageToolsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
