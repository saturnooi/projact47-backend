import { Module } from '@nestjs/common';
import { DeviceManagementHistoryService } from './device-management-history.service';
import { DeviceManagementHistoryController } from './device-management-history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManageTool } from 'src/manage_tools/entities/manage_tool.entity';
import { DeviceManagementHistory } from './entities/device-management-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ManageTool, DeviceManagementHistory])],
  controllers: [DeviceManagementHistoryController],
  providers: [DeviceManagementHistoryService],
})
export class DeviceManagementHistoryModule {}
