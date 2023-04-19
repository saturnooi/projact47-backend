import { Module } from '@nestjs/common';
import { DentistsEducationService } from './dentists-education.service';
import { DentistsEducationController } from './dentists-education.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DentistsEducation } from './entities/dentists-education.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DentistsEducation])],
  controllers: [DentistsEducationController],
  providers: [DentistsEducationService],
})
export class DentistsEducationModule {}
