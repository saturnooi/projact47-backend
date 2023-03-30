import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EncryptionService } from 'src/encryption/encryption.service';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    private readonly encryptionService: EncryptionService,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    try {
      const encryptedCardId = await this.encryptionService.encrypt(
        createEmployeeDto.card_id,
      );

      const savedEmployee = this.employeeRepository.create({
        ...createEmployeeDto,
        card_id: encryptedCardId,
      });
      await this.employeeRepository.save(savedEmployee);

      return {
        statusCode: 201,
        message: 'Employee created successfully',
        data: createEmployeeDto,
      };
    } catch (err) {
      throw new Error(`Could not create employee: ${err.message}`);
    }
  }

  async findAll() {
    try {
      const employees = await this.employeeRepository.find();

      employees.forEach(async (employee) => {
        employee.card_id = await this.encryptionService.decrypt(
          employee.card_id,
        );
      });

      return {
        statusCode: 200,
        message: 'Employees retrieved successfully',
        data: employees,
      };
    } catch (err) {
      throw new Error(`Could not get employees: ${err.message}`);
    }
  }

  async findOne(id: number) {
    try {
      const employee = await this.employeeRepository.findOneBy({ id: id });
      if (!employee) {
        return {
          statusCode: 404,
          message: `Employee with id ${id} not found`,
          data: null,
        };
      }
      employee.card_id = await this.encryptionService.decrypt(employee.card_id); // mask hashed card_id
      return {
        statusCode: 200,
        message: `Employee with id ${id} retrieved successfully`,
        data: employee,
      };
    } catch (err) {
      throw new Error(`Could not get employee with id ${id}: ${err.message}`);
    }
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    try {
      const employee = await this.employeeRepository.findOneBy({ id: id });
      if (!employee) {
        return {
          statusCode: 404,
          message: `Employee with id ${id} not found`,
          data: null,
        };
      }
      if (updateEmployeeDto.card_id) {
        updateEmployeeDto.card_id = await this.encryptionService.encrypt(
          updateEmployeeDto.card_id,
        );
      }
      this.employeeRepository.merge(employee, updateEmployeeDto);
      await this.employeeRepository.save(employee);
      return {
        statusCode: 200,
        message: `Employee with id ${id} updated successfully`,
        data: employee,
      };
    } catch (err) {
      throw new Error(
        `Could not update employee with id ${id}: ${err.message}`,
      );
    }
  }

  async remove(id: number) {
    try {
      const result = await this.employeeRepository.delete(id);
      if (result.affected === 0) {
        return {
          statusCode: 404,
          message: `Employee with id ${id} not found`,
          data: null,
        };
      }
      return {
        statusCode: 200,
        message: `Employee with id ${id} deleted successfully`,
        data: null,
      };
    } catch (err) {
      throw new Error(
        `Could not delete employee with id ${id}: ${err.message}`,
      );
    }
  }
}

