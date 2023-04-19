import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Connection } from 'typeorm';

import { Admin } from './admin/entities/admin.entity';
import { UsersModule } from './users/users.module';
import { EmployeeModule } from './employee/employee.module';
import { BlogModule } from './blog/blog.module';
import { QueueModule } from './queue/queue.module';
import { AuthModule } from './auth/auth.module';

import { Employee } from './employee/entities/employee.entity';
import { AdminModule } from './admin/admin.module';
import { Blog } from './blog/entities/blog.entity';
import { ManageToolsModule } from './manage_tools/manage_tools.module';
import { DeviceManagementHistoryModule } from './device-management-history/device-management-history.module';
import { ManageTool } from './manage_tools/entities/manage_tool.entity';
import { DeviceManagementHistory } from './device-management-history/entities/device-management-history.entity';
import { DentistModule } from './dentist/dentist.module';
import { DentistsEducationModule } from './dentists-education/dentists-education.module';
import { PatientModule } from './patient/patient.module';
import { DentistWorkModule } from './dentist-work/dentist-work.module';
import { Dentist } from './dentist/entities/dentist.entity';
import { DentistWork } from './dentist-work/entities/dentist-work.entity';
import { DentistsEducation } from './dentists-education/entities/dentists-education.entity';
import { User } from './users/entities/user.entity';
import { Patient } from './patient/entities/patient.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
      entities: [
        Employee,
        Admin,
        Blog,
        ManageTool,
        DeviceManagementHistory,
        Dentist,
        DentistWork,
        DentistsEducation,
        User,
        Patient,
      ],
      synchronize: true,
    }),
    UsersModule,
    EmployeeModule,
    BlogModule,
    QueueModule,
    AuthModule,
    AdminModule,
    ManageToolsModule,
    DeviceManagementHistoryModule,
    DentistModule,
    DentistsEducationModule,
    PatientModule,
    DentistWorkModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
