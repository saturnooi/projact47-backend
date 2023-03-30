import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Role } from '../entities/admin.entity';

export class CreateAdminDto {
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @IsNotEmpty()
  readonly employeeId: string;

  @IsNotEmpty()
  readonly role: Role;
}
