import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from 'src/admin/admin.service';
import { Admin, Role } from 'src/admin/entities/admin.entity';
import * as bcrypt from 'bcrypt';
import { Dentist } from 'src/dentist/entities/dentist.entity';
import { DentistService } from 'src/dentist/dentist.service';
import { Login } from 'src/models/login';

@Injectable()
export class AuthService {
  constructor(
    private readonly dentistService: DentistService,
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
  ) {}

  async validateAdmin(username: string, password: string) {
    const admin = await await this.adminService.findOneByUsername(username);
    const comparePassword = await bcrypt.compare(password, admin.password);
    if (admin && comparePassword) {
      return admin;
    }

    return null;
  }
  async validateDentist(username: string, password: string) {
    const dentist = (await this.dentistService.findByUsername(username)).data;
    if (!dentist) {
      return null;
    }
    const isPasswordValid = await bcrypt.compare(password, dentist.password);
    if (!isPasswordValid) {
      return null;
    }
    return { id: dentist.id, username: dentist.username, role: 'dentist' };
  }
  //   async validateUser(payload: any): Promise<User> {
  //     const { username, sub: id } = payload;
  //     const user = await this.userService.findOneByUsername(username);

  //     if (user && user.id === id) {
  //       return user;
  //     }

  //     return null;
  //   }

  async loginAdmin(admin: Login) {
    const payload = {
      username: admin.username,
      password: admin.password,
      Role: (await this.validateAdmin(admin.username, admin.password)).role,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async loginDentist(dentist: Login) {
    const payload = {
      username: dentist.username,
      password: dentist.password,
      Role: 'dentist',
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}





