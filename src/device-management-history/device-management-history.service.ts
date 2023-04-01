import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDeviceManagementHistoryDto } from './dto/create-device-management-history.dto';
import { UpdateDeviceManagementHistoryDto } from './dto/update-device-management-history.dto';
import { DeviceManagementHistory } from './entities/device-management-history.entity';

@Injectable()
export class DeviceManagementHistoryService {
  constructor(
    @InjectRepository(DeviceManagementHistory)
    private deviceManagementHistoryRepository: Repository<DeviceManagementHistory>,
  ) {}

  async create(
    createDeviceManagementHistoryDto: CreateDeviceManagementHistoryDto,
  ) {
    const latestRecord = await this.deviceManagementHistoryRepository.find({
      where: { manageToolsId: createDeviceManagementHistoryDto.manageToolsId },
    });

    const maxIdObject = latestRecord.reduce((max, obj) => {
      return obj.id > max.id ? obj : max;
    }, latestRecord[0]);

    if (!maxIdObject) {
      createDeviceManagementHistoryDto.remainingAmount = 0;
    } else {
      if (createDeviceManagementHistoryDto.type === 'IMPORT') {
        createDeviceManagementHistoryDto.remainingAmount =
          maxIdObject.remainingAmount + createDeviceManagementHistoryDto.amount;
      } else if (createDeviceManagementHistoryDto.type === 'EXPORT') {
        createDeviceManagementHistoryDto.remainingAmount =
          maxIdObject.remainingAmount - createDeviceManagementHistoryDto.amount;
      }
    }

    const deviceManagementHistory =
      this.deviceManagementHistoryRepository.create(
        createDeviceManagementHistoryDto,
      );
    return this.deviceManagementHistoryRepository.save(deviceManagementHistory);
  }

  async findAll() {
    return this.deviceManagementHistoryRepository.find({
      relations: ['manageTools'],
    });
  }

  findOne(id: number) {
    return this.deviceManagementHistoryRepository.findOne({
      where: {
        id,
      },
      relations: ['manageTools'],
    });
  }

  async findByToolId(toolId: number): Promise<DeviceManagementHistory[]> {
    return this.deviceManagementHistoryRepository.find({
      where: { manageTools: { id: toolId } },
      relations: ['manageTools'],
    });
  }

  update(
    id: number,
    updateDeviceManagementHistoryDto: UpdateDeviceManagementHistoryDto,
  ) {
    return `This action updates a #${id} deviceManagementHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} deviceManagementHistory`;
  }
}
