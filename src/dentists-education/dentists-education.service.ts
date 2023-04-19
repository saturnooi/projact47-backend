import { Injectable } from '@nestjs/common';
import { CreateDentistsEducationDto } from './dto/create-dentists-education.dto';
import { UpdateDentistsEducationDto } from './dto/update-dentists-education.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DentistsEducation } from './entities/dentists-education.entity';

@Injectable()
export class DentistsEducationService {
  constructor(
    @InjectRepository(DentistsEducation)
    private dentistsEducationRepository: Repository<DentistsEducation>,
  ) {}

  create(createDentistsEducationDto: CreateDentistsEducationDto) {
    return this.dentistsEducationRepository.save(createDentistsEducationDto);
  }

  findAll() {
    return this.dentistsEducationRepository.find();
  }

  findOne(id: number) {
    return this.dentistsEducationRepository.findOneBy({ id: id });
  }

  update(id: number, updateDentistsEducationDto: UpdateDentistsEducationDto) {
    return this.dentistsEducationRepository.update(
      id,
      updateDentistsEducationDto,
    );
  }

  async remove(id: number) {
    await this.dentistsEducationRepository.delete(id);
    return `This action removes a #${id} dentistsEducation`;
  }
}
