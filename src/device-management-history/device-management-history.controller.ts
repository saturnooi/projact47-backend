import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DeviceManagementHistoryService } from './device-management-history.service';
import { CreateDeviceManagementHistoryDto } from './dto/create-device-management-history.dto';
import { UpdateDeviceManagementHistoryDto } from './dto/update-device-management-history.dto';

@Controller('device-management-history')
export class DeviceManagementHistoryController {
  constructor(
    private readonly deviceManagementHistoryService: DeviceManagementHistoryService,
  ) {}

  @Post()
  create(
    @Body() createDeviceManagementHistoryDto: CreateDeviceManagementHistoryDto,
  ) {
    return this.deviceManagementHistoryService.create(
      createDeviceManagementHistoryDto,
    );
  }

  @Get()
  findAll() {
    return this.deviceManagementHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deviceManagementHistoryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDeviceManagementHistoryDto: UpdateDeviceManagementHistoryDto,
  ) {
    return this.deviceManagementHistoryService.update(
      +id,
      updateDeviceManagementHistoryDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deviceManagementHistoryService.remove(+id);
  }

  @Get(':toolId')
  async getDeviceManagementHistoryByToolId(@Param('toolId') toolId: number) {
    return this.deviceManagementHistoryService.findByToolId(toolId);
  }
}
