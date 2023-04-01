import { PartialType } from '@nestjs/mapped-types';
import { CreateDentistDto } from './create-dentist.dto';

export class UpdateDentistDto extends PartialType(CreateDentistDto) {}
