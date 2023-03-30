import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ManageToolsService } from './manage_tools.service';
import { CreateManageToolDto } from './dto/create-manage_tool.dto';
import { UpdateManageToolDto } from './dto/update-manage_tool.dto';

@Controller('manage-tools')
export class ManageToolsController {
  constructor(private readonly manageToolsService: ManageToolsService) {}

  @Post()
  create(@Body() createManageToolDto: CreateManageToolDto) {
    return this.manageToolsService.create(createManageToolDto);
  }

  @Get()
  findAll() {
    return this.manageToolsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.manageToolsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateManageToolDto: UpdateManageToolDto) {
    return this.manageToolsService.update(+id, updateManageToolDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.manageToolsService.remove(+id);
  }
}
