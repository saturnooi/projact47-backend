import { Injectable } from '@nestjs/common';
import { CreateManageToolDto } from './dto/create-manage_tool.dto';
import { UpdateManageToolDto } from './dto/update-manage_tool.dto';

@Injectable()
export class ManageToolsService {
  create(createManageToolDto: CreateManageToolDto) {
    return 'This action adds a new manageTool';
  }

  findAll() {
    return `This action returns all manageTools`;
  }

  findOne(id: number) {
    return `This action returns a #${id} manageTool`;
  }

  update(id: number, updateManageToolDto: UpdateManageToolDto) {
    return `This action updates a #${id} manageTool`;
  }

  remove(id: number) {
    return `This action removes a #${id} manageTool`;
  }
}
