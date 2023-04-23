import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { Admin } from './entities/admin.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Employee } from 'src/employee/entities/employee.entity';
import { Reflector } from '@nestjs/core';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { RolesGuard } from 'src/auth/role.guard';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from 'src/auth/constants';
import { EncryptionService } from 'src/encryption/encryption.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin, Employee]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '12h' },
    }),
  ],
  controllers: [AdminController],
  providers: [
    AdminService,
    // RolesGuard,
    // Reflector,
    EncryptionService,
  ],
})
export class AdminModule {}
