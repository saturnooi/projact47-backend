import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClinicServiceDto } from './dto/create-clinic-service.dto';
import { UpdateClinicServiceDto } from './dto/update-clinic-service.dto';
import { ClinicService } from './entities/clinic-service.entity';
@Injectable()
export class ClinicServicesService {
  constructor(
    @InjectRepository(ClinicService)
    private clinicServicesRepository: Repository<ClinicService>,
  ) // private readonly encryptionService: EncryptionService,
  {}

  create(createClinicServiceDto: CreateClinicServiceDto) {
    return this.clinicServicesRepository.create(createClinicServiceDto);
  }

  findAll() {
    return this.clinicServicesRepository.find();
  }

  findOne(id: number) {
    return this.clinicServicesRepository.findOne({
      where: {
        id,
      },
    });
  }

  update(id: number, updateClinicServiceDto: UpdateClinicServiceDto) {
    return `This action updates a #${id} clinicService`;
  }

  remove(id: number) {
    return `This action removes a #${id} clinicService`;
  }
}
