import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { QueueService } from './queue.service';
import { CreateQueueDto } from './dto/create-queue.dto';
import { UpdateQueueDto } from './dto/update-queue.dto';

@Controller('queue')
export class QueueController {
  constructor(private readonly queueService: QueueService) {}

  @Post()
  create(@Body() createQueueDto: CreateQueueDto) {
    return this.queueService.create(createQueueDto);
  }

  @Get('bydate')
  async findQueuesByDate(
    @Query('date') date: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('search') search = '',
    @Query('sortBy') sortBy = 'id',
    @Query('sortOrder') sortOrder: 'ASC' | 'DESC' = 'ASC',
    @Query('sortType') sortType: 'dentist' | 'patient' | 'queue' = 'queue',
  ) {
    const queues = await this.queueService.findQueuesByDate(
      new Date(date),
      page,
      limit,
      search,
      sortBy,
      sortOrder,
      sortType,
    );
    return queues;
  }

  // @Get()
  // findAll() {
  //   return this.queueService.findAll();
  // }

  @Get()
  async findAll(
    @Query('date') date: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('search') search = '',
    @Query('sortBy') sortBy = 'id',
    @Query('sortOrder') sortOrder: 'ASC' | 'DESC' = 'ASC',
    @Query('sortType') sortType: 'dentist' | 'patient' | 'queue' = 'queue',
  ) {
    const results = await this.queueService.findAll(
      page,
      limit,
      search,
      sortBy,
      sortOrder,
      sortType,
    );

    return results;
  }
  @Get('byMonth')
  async findByMonthAndYear(
    @Query('month') month: number,
    @Query('year') year: number,
  ) {
    const appointments = await this.queueService.findByMonthAndYear(
      month,
      year,
    );
    return appointments;
  }
  @Get('awaitingclinicalconfirmation')
  async findAllAwaitingClinicalConfirmation(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('search') search = '',
    @Query('sortBy') sortBy = 'id',
    @Query('sortOrder') sortOrder: 'ASC' | 'DESC' = 'ASC',
    @Query('sortType') sortType: 'dentist' | 'patient' | 'queue' = 'queue',
  ) {
    const queues = await this.queueService.findAllAwaitingClinicalConfirmation(
      page,
      limit,
      search,
      sortBy,
      sortOrder,
      sortType,
    );
    return queues;
  }

  @Get('awaiting-confirmation-count')
  async getAwaitingConfirmationCount(): Promise<number> {
    return this.queueService.getAwaitingConfirmationCount();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.queueService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQueueDto: UpdateQueueDto) {
    return this.queueService.update(+id, updateQueueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.queueService.remove(+id);
  }

  
}
