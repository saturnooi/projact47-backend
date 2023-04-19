import { Module } from '@nestjs/common';
import { DentistWorkService } from './dentist-work.service';
import { DentistWorkController } from './dentist-work.controller';
import { DentistWork } from './entities/dentist-work.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dentist } from 'src/dentist/entities/dentist.entity';
import { DentistService } from 'src/dentist/dentist.service';
import { EncryptionService } from 'src/encryption/encryption.service';

@Module({
  imports: [TypeOrmModule.forFeature([Dentist, DentistWork])],
  controllers: [DentistWorkController],
  providers: [DentistWorkService, DentistService, EncryptionService],
})
export class DentistWorkModule {}
