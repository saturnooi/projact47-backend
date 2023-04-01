import { Injectable } from '@nestjs/common';
import { CreateDentistsEducationDto } from './dto/create-dentists-education.dto';
import { UpdateDentistsEducationDto } from './dto/update-dentists-education.dto';

@Injectable()
export class DentistsEducationService {
  create(createDentistsEducationDto: CreateDentistsEducationDto) {
    return 'This action adds a new dentistsEducation';
  }

  findAll() {
    return `This action returns all dentistsEducation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dentistsEducation`;
  }

  update(id: number, updateDentistsEducationDto: UpdateDentistsEducationDto) {
    return `This action updates a #${id} dentistsEducation`;
  }

  remove(id: number) {
    return `This action removes a #${id} dentistsEducation`;
  }
}
