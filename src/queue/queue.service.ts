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

  // findAll() {
  //   return this.queueRepository.find({ relations: ['patient', 'dentist'] });
  // }
  async findAll(
    page = 1,
    limit = 10,
    search = '',
    sortBy = 'time_start',
    sortOrder: 'ASC' | 'DESC' = 'ASC',
    sortType: 'dentist' | 'patient' | 'queue' = 'queue',
  ) {
    const skip = (page - 1) * limit;
    const [results, total] = await this.queueRepository
      .createQueryBuilder('queue')
      .leftJoinAndSelect('queue.patient', 'patient')
      .leftJoinAndSelect('queue.dentist', 'dentist')
      .where(
        '(patient.first_name LIKE :search OR patient.last_name LIKE :search OR dentist.first_name LIKE :search OR dentist.last_name LIKE :search OR queue.symtom LIKE :search OR queue.status LIKE :search)',
        {
          search: `%${search}%`,
        },
      )
      .orderBy(
        sortType === 'dentist'
          ? `dentist.${sortBy}`
          : sortType === 'patient'
          ? `patient.${sortBy}`
          : `queue.${sortBy}`,
        sortOrder,
      )
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    const totalPages = Math.ceil(total / limit);

    return {
      results,
      total,
      page,
      totalPages,
    };
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

  async findQueuesByDate(
    date,
    page = 1,
    limit = 10,
    search = '',
    sortBy = 'time_start',
    sortOrder: 'ASC' | 'DESC' = 'ASC',

    sortType: 'dentist' | 'patient' | 'queue' = 'queue',
  ) {
    console.log(search);
    const skip = (page - 1) * limit;
    const [results, total] = await this.queueRepository
      .createQueryBuilder('queue')
      .leftJoinAndSelect('queue.patient', 'patient')
      .leftJoinAndSelect('queue.dentist', 'dentist')
      .where(
        '(DATE(queue.time_start) = :date OR queue.time_start >= :start AND queue.time_start < :end) AND (patient.first_name LIKE :search OR patient.last_name LIKE :search OR dentist.first_name LIKE :search OR dentist.last_name LIKE :search OR queue.symtom LIKE :search OR queue.status LIKE :search)',
        {
          date,
          start: date,
          end: new Date(date.getTime() + 86400000),
          search: `%${search}%`,
        },
      )
      .orderBy(
        sortType === 'dentist'
          ? `dentist.${sortBy}`
          : sortType === 'patient'
          ? `patient.${sortBy}`
          : `queue.${sortBy}`,
        sortOrder,
      )
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    const totalPages = Math.ceil(total / limit);

    return {
      results,
      total,
      page,
      totalPages,
    };
  }

  async findAllAwaitingClinicalConfirmation(
    page = 1,
    limit = 10,
    search = '',
    sortBy = 'time_start',
    sortOrder: 'ASC' | 'DESC' = 'ASC',
    sortType: 'dentist' | 'patient' | 'queue' = 'queue',
  ) {
    const skip = (page - 1) * limit;
    const [results, total] = await this.queueRepository
      .createQueryBuilder('queue')
      .leftJoinAndSelect('queue.patient', 'patient')
      .leftJoinAndSelect('queue.dentist', 'dentist')
      .where(
        `(patient.first_name LIKE :search OR patient.last_name LIKE :search OR dentist.first_name LIKE :search OR dentist.last_name LIKE :search) AND queue.status = :status`,
        {
          search: `%${search}%`,
          status: 'รอการยืนยันจากคลินิก',
        },
      )
      .orderBy(
        sortType === 'dentist'
          ? `dentist.${sortBy}`
          : sortType === 'patient'
          ? `patient.${sortBy}`
          : `queue.${sortBy}`,
        sortOrder,
      )
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    const totalPages = Math.ceil(total / limit);

    return {
      results,
      total,
      page,
      totalPages,
    };
  }

  async getAwaitingConfirmationCount(): Promise<number> {
    const count = await this.queueRepository.count({ where: { status: 'รอการยืนยันจากคลินิก' } });
    return count;
  }
  
}
