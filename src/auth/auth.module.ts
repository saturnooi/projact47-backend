import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AdminModule } from 'src/admin/admin.module';
import { LocalStrategy } from './local.strategy';

import { jwtConstants } from './constants';
import { AdminService } from 'src/admin/admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from 'src/admin/entities/admin.entity';
import { DentistService } from 'src/dentist/dentist.service';
import { Dentist } from 'src/dentist/entities/dentist.entity';
import { DentistModule } from 'src/dentist/dentist.module';
import { EncryptionService } from 'src/encryption/encryption.service';

import { RolesGuard } from './role.guard';
import { AuthController } from './auth.controller';
import { LocalAdminStrategy } from './local-admin.strategy';
import { LocalDentistStrategy } from './local-dentist.strategy';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin, Dentist]),
    AdminModule,
    DentistModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '12h' },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    AdminService,
    DentistService,
    EncryptionService,
    LocalAdminStrategy,
    LocalDentistStrategy,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}