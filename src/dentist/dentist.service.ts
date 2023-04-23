import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDentistDto } from './dto/create-dentist.dto';
import { UpdateDentistDto } from './dto/update-dentist.dto';
import { Dentist } from './entities/dentist.entity';
import * as bcrypt from 'bcrypt';
import { EncryptionService } from 'src/encryption/encryption.service';

@Injectable()
export class DentistService {
  constructor(
    @InjectRepository(Dentist)
    private dentistRepository: Repository<Dentist>,
    private readonly encryptionService: EncryptionService,
  ) {}

  private async getHashed(cardId: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(cardId, salt);
  }

  async create(createDentistDto: CreateDentistDto) {
    try {
      const hashedPassword = await this.getHashed(createDentistDto.password);
      const encryptedCardId = await this.encryptionService.encrypt(
        createDentistDto.card_id,
      );
      const dentist = this.dentistRepository.create({
        ...createDentistDto,
        card_id: encryptedCardId,
        password: hashedPassword,
      });
      const savedDentist = await this.dentistRepository.save(dentist);
      savedDentist.password = null;
      return {
        statusCode: 201,
        message: 'Username created successfully',
        data: savedDentist,
      };
    } catch (err) {
      throw new Error(`Could not create Username : ${err.message}`);
    }
  }

  async findAll() {
    const dentists = await this.dentistRepository.find({
      relations: ['dentistsEducation'],
    });
    dentists.forEach(async (dentist) => {
      dentist.card_id = await this.encryptionService.decrypt(dentist.card_id);
    });
    dentists.map((dentist) => {
      dentist.password = null;
      return dentist;
    });
    return {
      statusCode: 200,
      message: 'Retrieved successfully',
      data: dentists,
    };
  }

  async findByUsername(username: string) {
    const dentist = await this.dentistRepository.findOne({
      where: {
        username,
      },
      relations: ['dentistsEducation'],
    });
    dentist.card_id = await this.encryptionService.decrypt(dentist.card_id);
    dentist.password = null;

    if (!dentist) {
      return {
        statusCode: 404,
        message: `Username  not found`,
        data: null,
      };
    }
    return {
      statusCode: 200,
      message: `Username retrieved successfully`,
      data: dentist,
    };
  }

  async findOne(id: number) {
    const dentist = await this.dentistRepository.findOne({
      where: {
        id,
      },
      relations: ['dentistsEducation'],
    });
    dentist.card_id = await this.encryptionService.decrypt(dentist.card_id);
    dentist.password = null;

    if (!dentist) {
      return {
        statusCode: 404,
        message: `Username with id ${id} not found`,
        data: null,
      };
    }
    return {
      statusCode: 200,
      message: `Username with id ${id} retrieved successfully`,
      data: dentist,
    };
  }

  async findOneByUsername(username: string) {
    try {
      const dentist = await this.dentistRepository.findOne({
        where: {
          username: username,
        },
        relations: ['dentistsEducation'],
      });

      if (!dentist) {
        return {
          statusCode: 404,
          message: `Username with id ${username} not found`,
          data: null,
        };
      }

      return {
        statusCode: 200,
        message: `Username with id ${username} retrieved successfully`,
        data: dentist,
      };
    } catch (err) {
      throw new Error(
        `Could not get username with id ${username}: ${err.message}`,
      );
    }
  }

  async getSimpleDentists(): Promise<{ id: number; name: string }[]> {
    const dentists = await this.dentistRepository.find();
    return dentists.map(({ id, prefix, first_name, last_name }) => ({
      id,
      name: `${prefix} ${first_name} ${last_name}`,
    }));
  }

  update(id: number, updateDentistDto: UpdateDentistDto) {
    return this.dentistRepository.update(id, updateDentistDto);
  }

  remove(id: number) {
    this.dentistRepository.delete(id);
    return `This action removes a #${id} dentist`;
  }
}
