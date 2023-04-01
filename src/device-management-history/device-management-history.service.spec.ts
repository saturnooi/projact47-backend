import { Test, TestingModule } from '@nestjs/testing';
import { DeviceManagementHistoryService } from './device-management-history.service';

describe('DeviceManagementHistoryService', () => {
  let service: DeviceManagementHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeviceManagementHistoryService],
    }).compile();

    service = module.get<DeviceManagementHistoryService>(DeviceManagementHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
