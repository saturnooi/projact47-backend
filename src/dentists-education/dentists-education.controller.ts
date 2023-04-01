import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DentistsEducationService } from './dentists-education.service';
import { CreateDentistsEducationDto } from './dto/create-dentists-education.dto';
import { UpdateDentistsEducationDto } from './dto/update-dentists-education.dto';

@Controller('dentists-education')
export class DentistsEducationController {
  constructor(private readonly dentistsEducationService: DentistsEducationService) {}

  @Post()
  create(@Body() createDentistsEducationDto: CreateDentistsEducationDto) {
    return this.dentistsEducationService.create(createDentistsEducationDto);
  }

  @Get()
  findAll() {
    return this.dentistsEducationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dentistsEducationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDentistsEducationDto: UpdateDentistsEducationDto) {
    return this.dentistsEducationService.update(+id, updateDentistsEducationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dentistsEducationService.remove(+id);
  }
}
