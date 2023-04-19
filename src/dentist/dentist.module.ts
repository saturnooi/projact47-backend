import { Module } from '@nestjs/common';
import { DentistService } from './dentist.service';
import { DentistController } from './dentist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dentist } from './entities/dentist.entity';
import { EncryptionService } from 'src/encryption/encryption.service';

@Module({
  imports: [TypeOrmModule.forFeature([Dentist])],
  controllers: [DentistController],
  providers: [DentistService, EncryptionService],
})
export class DentistModule {}
