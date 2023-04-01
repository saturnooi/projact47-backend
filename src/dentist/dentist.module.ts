import { Module } from '@nestjs/common';
import { DentistService } from './dentist.service';
import { DentistController } from './dentist.controller';

@Module({
  controllers: [DentistController],
  providers: [DentistService]
})
export class DentistModule {}
