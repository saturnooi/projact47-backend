import { Module } from '@nestjs/common';
import { QueueService } from './queue.service';
import { QueueController } from './queue.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Queue } from './entities/queue.entity';
import { Patient } from 'src/patient/entities/patient.entity';
import { Dentist } from 'src/dentist/entities/dentist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Queue, Patient, Dentist])],
  controllers: [QueueController],
  providers: [QueueService],
})
export class QueueModule {}
