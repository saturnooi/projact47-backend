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

  async create(createDentistWorkDto: CreateDentistWorkDto) {
    if (createDentistWorkDto.repetition === 'day') {
      return [await this.dentistWorkRepository.save(createDentistWorkDto)];
    } else if (createDentistWorkDto.repetition === 'week') {
      const daysInWeek = 7;
      const startDate = new Date(createDentistWorkDto.startTime);
      const endDate = new Date(createDentistWorkDto.endTime);
      const workingDays: DentistWork[] = [];
      for (let i = 0; i < daysInWeek; i++) {
        const dayOfWeek = (startDate.getDay() + i) % daysInWeek;
        const startTime = new Date(startDate);
        const endTime = new Date(endDate);
        startTime.setDate(startDate.getDate() + i);
        endTime.setDate(endDate.getDate() + i);
        const newWorkingDay = {
          ...createDentistWorkDto,
          dayOfWeek,
          startTime,
          endTime,
        };
        workingDays.push(await this.dentistWorkRepository.save(newWorkingDay));
      }
      return workingDays;
    } else if (createDentistWorkDto.repetition === 'month') {
      const daysInMonth = new Date(
        createDentistWorkDto.startTime.getFullYear(),
        createDentistWorkDto.startTime.getMonth() + 1,
        0,
      ).getDate();
      const startDate = new Date(createDentistWorkDto.startTime);
      const endDate = new Date(createDentistWorkDto.endTime);
      const workingDays: DentistWork[] = [];
      for (let i = 0; i < daysInMonth; i++) {
        const dayOfWeek = (startDate.getDay() + i) % 7;
        const startTime = new Date(startDate);
        const endTime = new Date(endDate);
        startTime.setDate(startDate.getDate() + i);
        endTime.setDate(endDate.getDate() + i);
        const newWorkingDay = {
          ...createDentistWorkDto,
          dayOfWeek,
          startTime,
          endTime,
        };
        const playlode = await this.dentistWorkRepository.save(newWorkingDay);
        workingDays.push();
      }
      return workingDays;
    } else {
      return [await this.dentistWorkRepository.save(createDentistWorkDto)];
    }
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

  async getMonthlySchedule(year: number, month: number): Promise<any[]> {
    const dentists = await this.dentistRepository.find({
      relations: ['works'],
    });

    const monthlySchedule = dentists.map((dentist) => {
      const workingDays = dentist.works.filter((workingDay) => {
        const workingDayYear = workingDay.startTime.getFullYear();
        const workingDayMonth = workingDay.startTime.getMonth();
        return workingDayYear === year && workingDayMonth === month;
      });
      return {
        dentist,
        workingDays,
      };
    });

    return monthlySchedule;
  }
}
