import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { Repository } from 'typeorm';
import { EncryptionService } from 'src/encryption/encryption.service';

@Injectable()
export class AdminService {
  constructor(
    private readonly encryptionService: EncryptionService,
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {}

  private async getHashed(cardId: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    console.log(salt);
    return await bcrypt.hash(cardId, salt);
  }

  async create(createAdminDto: CreateAdminDto) {
    try {
      const hashedPassword = await this.getHashed(createAdminDto.password);
      const admin = this.adminRepository.create({
        ...createAdminDto,
        password: hashedPassword,
      });
      const savedAdmin = await this.adminRepository.save(admin);
      savedAdmin.password = null;
      return savedAdmin;
    } catch (err) {
      throw new Error(`Could not create Username : ${err.message}`);
    }
  }

  async findAll() {
    try {
      const admins = await this.adminRepository.find({
        relations: ['employee'],
      });
      admins.map((admin) => {
        admin.password = null;
        return admin;
      });
      return admins;
    } catch (err) {
      throw new Error(`Could not get employees: ${err.message}`);
    }
  }

  async findOne(id: number) {
    try {
      const admin = await this.adminRepository.findOne({
        where: {
          id,
        },
        relations: ['employee'],
      });

      admin.password = null;
      if (!admin) {
        throw new Error(
          `Could not get employees: ${`Username with id ${id} not found`}`,
        );
      }
      return admin;
    } catch (err) {
      throw new Error(`Could not get username with id ${id}: ${err.message}`);
    }
  }
  async findOneByUsername(username: string) {
    try {
      const admin = await this.adminRepository.findOne({
        where: {
          username,
        },
        relations: ['employee'],
      });

      if (!admin) {
        throw new Error(`Could not get employees: ${`Username  not found`}`);
      }
      return admin;
    } catch (err) {
      throw new Error(`Could not get username : ${err.message}`);
    }
  }

  async Profile(username: string) {
    try {
      const admin = await this.adminRepository.findOne({
        where: {
          username,
        },
        relations: ['employee'],
      });

      admin.password = null;
      admin.employee.card_id = await this.encryptionService.decrypt(
        admin.employee.card_id,
      );
      if (!admin) {
        throw new Error(`Could not get employees: ${`Username  not found`}`);
      }
      return admin;
    } catch (err) {
      throw new Error(`Could not get username : ${err.message}`);
    }
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
