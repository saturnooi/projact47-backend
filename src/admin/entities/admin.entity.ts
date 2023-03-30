import { Employee } from 'src/employee/entities/employee.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

export enum Role {
  Admin = 'admin',
  SuperAdmin = 'superadmin',
}

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.Admin,
  })
  role: Role;

  @OneToOne(() => Employee, (employee) => employee.admin)
  @JoinColumn()
  employee: Employee;
}
