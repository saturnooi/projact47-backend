import { Module } from '@nestjs/common';
import { ManageToolsService } from './manage_tools.service';
import { ManageToolsController } from './manage_tools.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManageTool } from './entities/manage_tool.entity';
import { DeviceManagementHistory } from 'src/device-management-history/entities/device-management-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ManageTool, DeviceManagementHistory])],
  controllers: [ManageToolsController],
  providers: [ManageToolsService],
})
export class ManageToolsModule {}
