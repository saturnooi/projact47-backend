import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';

import { AuthService } from './auth/auth.service';

import { LocalAdminAuthGuard } from './auth/local/local-admin-auth.guard';
import { RolesGuard } from './auth/role.guard';
import { Roles } from './auth/roles.decorator';
import { JwtAuthGuard } from './auth/jwt/jwt-auth.guard';
import { Login } from './models/login';
import { AdminService } from './admin/admin.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
