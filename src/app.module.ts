import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Connection } from 'typeorm';
// import { AdminModule } from './admin/admin.module';
// import { Admin } from './admin/entities/admin.entity';
import { UsersModule } from './users/users.module';
import { EmployeeModule } from './employee/employee.module';
import { BlogModule } from './blog/blog.module';
import { QueueModule } from './queue/queue.module';
import { AuthModule } from './auth/auth.module';
import { GuardService } from './guard/guard.service';
import { GuardModule } from './guard/guard.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
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
      entities: [],
      synchronize: true,
    }),
    UsersModule,
    EmployeeModule,
    BlogModule,
    QueueModule,
    AuthModule,
    GuardModule,
    // AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService, GuardService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
