import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Admin } from 'src/admin/entities/admin.entity';
import { AuthService } from './auth.service';
import { Login } from 'src/models/login';
import { AuthGuard } from '@nestjs/passport';
import { LocalAdminStrategy } from './local-admin.strategy';
import { LocalDentistStrategy } from './local-dentist.strategy';
import { LocalAdminAuthGuard } from './local/local-admin-auth.guard';
import { LocalDentistAuthGuard } from './local/local-dentist-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly localAdminStrategy: LocalAdminStrategy,
    private readonly localDentistStrategy: LocalDentistStrategy,
  ) {}
  @UseGuards(LocalAdminAuthGuard)
  @Post('admin/login')
  async adminLogin(@Body() admin: Login): Promise<{ access_token: string }> {
    return await this.authService.loginAdmin(admin);
  }

  @UseGuards(LocalDentistAuthGuard)
  @Post('dentist/login')
  async dentistLogin(
    @Body() dentist: Login,
  ): Promise<{ access_token: string }> {
    console.log(dentist);
    return await this.authService.loginDentist(dentist);
  }
}
