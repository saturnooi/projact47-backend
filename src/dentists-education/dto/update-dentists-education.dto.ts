import { PartialType } from '@nestjs/mapped-types';
import { CreateDentistsEducationDto } from './create-dentists-education.dto';

export class UpdateDentistsEducationDto extends PartialType(CreateDentistsEducationDto) {}
