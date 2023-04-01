import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeviceManagementHistory } from 'src/device-management-history/entities/device-management-history.entity';
import { Repository } from 'typeorm';
import { CreateManageToolDto } from './dto/create-manage_tool.dto';
import { UpdateManageToolDto } from './dto/update-manage_tool.dto';
import { ManageTool } from './entities/manage_tool.entity';

@Injectable()
export class ManageToolsService {
  constructor(
    @InjectRepository(ManageTool)
    private readonly manageToolRepository: Repository<ManageTool>,
    @InjectRepository(DeviceManagementHistory)
    private deviceManagementHistoryRepository: Repository<DeviceManagementHistory>,
  ) {}
  create(createManageToolDto: CreateManageToolDto) {
    return this.manageToolRepository.save(createManageToolDto);
  }

  findAll() {
    return this.manageToolRepository.find({
      relations: ['deviceManagementHistory'],
    });
  }

  findOne(id: number) {
    return this.manageToolRepository.findOne({
      where: {
        id,
      },
      relations: ['deviceManagementHistory'],
    });
  }

  update(id: number, updateManageToolDto: UpdateManageToolDto) {
    return this.manageToolRepository.update(id, updateManageToolDto);
  }
  remove(id: number) {
    this.manageToolRepository.delete(id);
    return `This action removes a #${id} manageTool`;
  }
}
