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
  readonly employeeId: number;

  @IsNotEmpty()
  readonly role: Role;
}
