import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { DentistWorkService } from './dentist-work.service';
import { CreateDentistWorkDto } from './dto/create-dentist-work.dto';
import { UpdateDentistWorkDto } from './dto/update-dentist-work.dto';

@Controller('dentist-work')
export class DentistWorkController {
  constructor(private readonly dentistWorkService: DentistWorkService) {}

  @Post()
  create(@Body() createDentistWorkDto: CreateDentistWorkDto) {
    return this.dentistWorkService.create(createDentistWorkDto);
  }

  @Get()
  findAll() {
    return this.dentistWorkService.findAll();
  }
  @Get('byMonth')
  async findByMonthAndYear(
    @Query('month') month: number,
    @Query('year') year: number,
  ) {
    const appointments = await this.dentistWorkService.findByMonthAndYear(
      month,
      year,
    );
    return appointments;
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dentistWorkService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDentistWorkDto: UpdateDentistWorkDto,
  ) {
    return this.dentistWorkService.update(+id, updateDentistWorkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dentistWorkService.remove(+id);
  }
  // @Get('/monthly-schedule/:month/:year')
  // async getMonthlySchedule(
  //   @Param('month') month: number,
  //   @Param('year') year: number,
  // ) {
  //   return this.dentistWorkService.getMonthlySchedule(year, month);
  // }
}
