import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { Dentist } from 'src/dentist/entities/dentist.entity';

@Injectable()
export class LocalDentistStrategy extends PassportStrategy(
  Strategy,
  'local-dentist',
) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string) {
    console.log(username,password);
    const dentist = await this.authService.validateDentist(username, password);
    if (!dentist) {
      throw new UnauthorizedException('Invalid username or password');
    }
    return dentist;
  }
}
