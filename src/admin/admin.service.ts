import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { Repository } from 'typeorm';
import { Employee } from 'src/employee/entities/employee.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {}

  private async getHashed(cardId: string): Promise<string> {
    const salt = await bcrypt.genSalt();
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
      return {
        statusCode: 201,
        message: 'Username created successfully',
        data: savedAdmin,
      };
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
      return {
        statusCode: 200,
        message: 'Retrieved successfully',
        data: admins,
      };
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
        return {
          statusCode: 404,
          message: `Username with id ${id} not found`,
          data: null,
        };
      }

      return {
        statusCode: 200,
        message: `Username with id ${id} retrieved successfully`,
        data: admin,
      };
    } catch (err) {
      throw new Error(`Could not get username with id ${id}: ${err.message}`);
    }
  }

  async findOneByUsername(username: string) {
    try {
      const admin = await this.adminRepository.findOne({
        where: {
          username: username,
        },
        relations: ['employee'],
      });

      if (!admin) {
        return {
          statusCode: 404,
          message: `Username with id ${username} not found`,
          data: null,
        };
      }

      return {
        statusCode: 200,
        message: `Username with id ${username} retrieved successfully`,
        data: admin,
      };
    } catch (err) {
      throw new Error(
        `Could not get username with id ${username}: ${err.message}`,
      );
    }
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
