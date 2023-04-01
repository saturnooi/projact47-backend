import { Injectable } from '@nestjs/common';
import { CreateDentistDto } from './dto/create-dentist.dto';
import { UpdateDentistDto } from './dto/update-dentist.dto';

@Injectable()
export class DentistService {
  create(createDentistDto: CreateDentistDto) {
    return 'This action adds a new dentist';
  }

  findAll() {
    return `This action returns all dentist`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dentist`;
  }

  update(id: number, updateDentistDto: UpdateDentistDto) {
    return `This action updates a #${id} dentist`;
  }

  remove(id: number) {
    return `This action removes a #${id} dentist`;
  }
}
