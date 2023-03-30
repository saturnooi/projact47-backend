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
      entities: [Employee, Admin, Blog],
      synchronize: true,
    }),
    UsersModule,
    EmployeeModule,
    BlogModule,
    QueueModule,
    AuthModule,
    AdminModule,
    ManageToolsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
