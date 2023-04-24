import { Injectable } from '@nestjs/common';
import { CreateQueueDto } from './dto/create-queue.dto';
import { UpdateQueueDto } from './dto/update-queue.dto';
import { Queue } from './entities/queue.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class QueueService {
  constructor(
    @InjectRepository(Queue)
    private readonly queueRepository: Repository<Queue>,
  ) {}
  create(createQueueDto: CreateQueueDto) {
    return this.queueRepository.save(createQueueDto);
  }

  findAll() {
    return this.queueRepository.find({ relations: ['patient', 'dentist'] });
  }

  findOne(id: number) {
    return this.queueRepository.findOne({
      where: {
        id,
      },
      relations: ['patient', 'dentist'],
    });
  }

  async update(id: number, updateQueueDto: UpdateQueueDto) {
    await this.queueRepository.update(id, updateQueueDto);
    return this.queueRepository.findOne({
      where: {
        id,
      },
      relations: ['patient', 'dentist'],
    });
  }

  remove(id: number) {
    this.queueRepository.delete(id);
  }

  async findQueuesByDate(date: Date): Promise<Queue[]> {
    const queues = await this.queueRepository
      .createQueryBuilder('queue')
      .leftJoinAndSelect('queue.patient', 'patient')
      .leftJoinAndSelect('queue.dentist', 'dentist')
      .where('queue.time_start >= :start', { start: date })
      .andWhere('queue.time_start < :end', {
        end: new Date(date.getTime() + 86400000),
      })
      .getMany();

    return queues;
  }
  }

  

