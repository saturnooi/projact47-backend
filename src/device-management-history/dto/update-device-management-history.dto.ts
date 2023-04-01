import { PartialType } from '@nestjs/mapped-types';
import { CreateDeviceManagementHistoryDto } from './create-device-management-history.dto';

export class UpdateDeviceManagementHistoryDto extends PartialType(CreateDeviceManagementHistoryDto) {}
