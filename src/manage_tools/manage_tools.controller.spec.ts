import { Test, TestingModule } from '@nestjs/testing';
import { ManageToolsController } from './manage_tools.controller';
import { ManageToolsService } from './manage_tools.service';

describe('ManageToolsController', () => {
  let controller: ManageToolsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManageToolsController],
      providers: [ManageToolsService],
    }).compile();

    controller = module.get<ManageToolsController>(ManageToolsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
