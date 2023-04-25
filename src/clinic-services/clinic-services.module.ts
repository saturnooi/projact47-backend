import { Module } from '@nestjs/common';
import { ClinicServicesService } from './clinic-services.service';
import { ClinicServicesController } from './clinic-services.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicService } from './entities/clinic-service.entity';
@Module({
  imports: [TypeOrmModule.forFeature([ClinicService])],
  controllers: [ClinicServicesController],
  providers: [ClinicServicesService],
})
export class ClinicServicesModule {}
