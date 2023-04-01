import { Test, TestingModule } from '@nestjs/testing';
import { DeviceManagementHistoryController } from './device-management-history.controller';
import { DeviceManagementHistoryService } from './device-management-history.service';

describe('DeviceManagementHistoryController', () => {
  let controller: DeviceManagementHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeviceManagementHistoryController],
      providers: [DeviceManagementHistoryService],
    }).compile();

    controller = module.get<DeviceManagementHistoryController>(DeviceManagementHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
