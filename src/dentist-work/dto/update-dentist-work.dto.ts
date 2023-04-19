import { PartialType } from '@nestjs/mapped-types';
import { CreateDentistWorkDto } from './create-dentist-work.dto';

export class UpdateDentistWorkDto extends PartialType(CreateDentistWorkDto) {}
