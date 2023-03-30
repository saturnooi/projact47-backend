import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from 'src/admin/admin.service';
import { Admin } from 'src/admin/entities/admin.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
  ) {}

  async validateAdmin(payload: any) {
    const { username, sub: id, role, password } = payload;
    const admin = await (
      await this.adminService.findOneByUsername(payload.username)
    ).data;
    const comparePassword = await bcrypt.compare(password, admin.password);
    if (admin && comparePassword) {
      return admin;
    }

    return null;
  }

  //   async validateUser(payload: any): Promise<User> {
  //     const { username, sub: id } = payload;
  //     const user = await this.userService.findOneByUsername(username);

  //     if (user && user.id === id) {
  //       return user;
  //     }

  //     return null;
  //   }

  async loginAdmin(admin: Admin) {
    const payload = {
      sub: admin.id,
      username: admin.username,
      role: admin.role,
    };

    return {
      _token: this.jwtService.sign(payload),
    };
  }

  //   async loginUser(user: User): Promise<string> {
  //     const payload = { username: user.username, sub: user.id };
  //     return this.jwtService.sign(payload);
  //   }
}
