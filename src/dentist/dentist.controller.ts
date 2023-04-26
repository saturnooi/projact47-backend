import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DentistService } from './dentist.service';
import { CreateDentistDto } from './dto/create-dentist.dto';
import { UpdateDentistDto } from './dto/update-dentist.dto';

@Controller('dentist')
export class DentistController {
  constructor(private readonly dentistService: DentistService) {}

  @Post()
  create(@Body() createDentistDto: CreateDentistDto) {
    return this.dentistService.create(createDentistDto);
  }

  @Get()
  findAll() {
    return this.dentistService.findAll();
  }

  @Get('simple')
  async getSimpleDentists() {
    return this.dentistService.getSimpleDentists();
  }
  @Get('profile/:username')
  profile(@Param('username') username: string) {
    return this.dentistService.Profile(username);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dentistService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDentistDto: UpdateDentistDto) {
    return this.dentistService.update(+id, updateDentistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dentistService.remove(+id);
  }
}
