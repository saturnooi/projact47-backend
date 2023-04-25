import { Injectable } from '@nestjs/common';
import { CreateDentistWorkDto } from './dto/create-dentist-work.dto';
import { UpdateDentistWorkDto } from './dto/update-dentist-work.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DentistWork } from './entities/dentist-work.entity';
import { Repository } from 'typeorm';
import { Dentist } from 'src/dentist/entities/dentist.entity';

@Injectable()
export class DentistWorkService {
  constructor(
    @InjectRepository(DentistWork)
    private dentistRepository: Repository<Dentist>,
    @InjectRepository(DentistWork)
    private dentistWorkRepository: Repository<DentistWork>,
  ) {}

  private async createSingleSchedule(
    createDentistWorkDto: CreateDentistWorkDto,
  ) {
    return this.dentistWorkRepository.save(createDentistWorkDto);
  }

  async create(createDentistWorkDto: CreateDentistWorkDto) {
    const schedules: CreateDentistWorkDto[] = [];

    switch (createDentistWorkDto.repeatType) {
      case 'null':
        // Create schedule for today only
        schedules.push(await this.createSingleSchedule(createDentistWorkDto));
        break;
      case 'Day':
        // Create schedule for today only
        schedules.push(await this.createSingleSchedule(createDentistWorkDto));
        for (let i = 1; i <= 364; i++) {
          const nextDateStart = new Date(createDentistWorkDto.time_start);
          nextDateStart.setDate(nextDateStart.getDate() + i);
          const nextDateEnd = new Date(createDentistWorkDto.time_end);
          nextDateEnd.setDate(nextDateEnd.getDate() + i);
          schedules.push(
            await this.createSingleSchedule({
              dentist: createDentistWorkDto.dentist,
              time_start: nextDateStart,
              time_end: nextDateEnd,
              repeatType: createDentistWorkDto.repeatType,
            }),
          );
        }

        break;
      case 'Week':
        // Create schedule for today and every next 7 days at the same time
        schedules.push(await this.createSingleSchedule(createDentistWorkDto));
        for (let i = 1; i <= 4; i++) {
          const nextDateStart = new Date(createDentistWorkDto.time_start);
          nextDateStart.setDate(nextDateStart.getDate() + i * 7);
          const nextDateEnd = new Date(createDentistWorkDto.time_end);
          nextDateEnd.setDate(nextDateEnd.getDate() + i * 7);
          schedules.push(
            await this.createSingleSchedule({
              dentist: createDentistWorkDto.dentist,
              time_start: nextDateStart,
              time_end: nextDateEnd,
              repeatType: createDentistWorkDto.repeatType,
            }),
          );
        }
        break;
      case 'Month':
        // Create schedule for today and every next month on the same date at the same time
        schedules.push(await this.createSingleSchedule(createDentistWorkDto));
        for (let i = 1; i <= 11; i++) {
          const nextDateStart = new Date(createDentistWorkDto.time_start);
          nextDateStart.setMonth(nextDateStart.getMonth() + i);

          const nextDateEnd = new Date(createDentistWorkDto.time_start);
          nextDateEnd.setMonth(nextDateEnd.getMonth() + i);
          schedules.push(
            await this.createSingleSchedule({
              dentist: createDentistWorkDto.dentist,
              time_start: nextDateStart,
              time_end: nextDateEnd,
              repeatType: createDentistWorkDto.repeatType,
            }),
          );
        }
        break;
    }

    return schedules;
  }

  async findAll() {
    return await this.dentistWorkRepository.find();
  }

  async findOne(id: number) {
    return await this.dentistWorkRepository.findBy({ id: id });
  }

  async update(id: number, updateDentistWorkDto: UpdateDentistWorkDto) {
    return await this.dentistWorkRepository.update(id, updateDentistWorkDto);
  }

  async remove(id: number) {
    await this.dentistWorkRepository.delete(id);
    return `This action removes a #${id} dentistWork`;
  }

  async findByMonthAndYear(month: number, year: number) {
    const startOfMonth = new Date(`${year}-${month}-01`);
    const endOfMonth = new Date(
      new Date(startOfMonth).setMonth(startOfMonth.getMonth() + 1),
    );

    const appointments = await this.dentistWorkRepository
      .createQueryBuilder('dentistWork')
      .leftJoinAndSelect('dentistWork.dentist', 'dentist')
      .where('dentistWork.time_start >= :startOfMonth', { startOfMonth })
      .andWhere('dentistWork.time_end < :endOfMonth', { endOfMonth })
      .getMany();
    return appointments;
  }

  // async getMonthlySchedule(year: number, month: number): Promise<any[]> {
  //   const dentists = await this.dentistRepository.find({
  //     relations: ['works'],
  //   });

  //   const monthlySchedule = dentists.map((dentist) => {
  //     const workingDays = dentist.works.filter((workingDay) => {
  //       const workingDayYear = workingDay.startTime.getFullYear();
  //       const workingDayMonth = workingDay.startTime.getMonth();
  //       return workingDayYear === year && workingDayMonth === month;
  //     });
  //     return {
  //       dentist,
  //       workingDays,
  //     };
  //   });

  //   return monthlySchedule;
  // }
}
