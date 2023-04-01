import { Module } from '@nestjs/common';
import { DentistsEducationService } from './dentists-education.service';
import { DentistsEducationController } from './dentists-education.controller';

@Module({
  controllers: [DentistsEducationController],
  providers: [DentistsEducationService]
})
export class DentistsEducationModule {}
