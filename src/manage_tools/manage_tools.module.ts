import { Module } from '@nestjs/common';
import { ManageToolsService } from './manage_tools.service';
import { ManageToolsController } from './manage_tools.controller';

@Module({
  controllers: [ManageToolsController],
  providers: [ManageToolsService]
})
export class ManageToolsModule {}
