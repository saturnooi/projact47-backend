import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { IsString, IsOptional, IsDateString } from 'class-validator';

import { User } from 'src/users/entities/user.entity';

@Entity()
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  email: string;

  @Column()
  @IsString()
  card_id: string;

  @Column()
  @IsString()
  img: string;

  @Column()
  @IsString()
  prefix: string;

  @Column()
  @IsString()
  first_name: string;

  @Column()
  @IsString()
  last_name: string;

  @Column({ type: 'timestamp' })
  @IsDateString()
  dateofbirth: Date;

  @Column()
  @IsString()
  tel: string;

  @Column()
  @IsOptional()
  @IsString()
  underlying_disease?: string;

  @Column()
  @IsOptional()
  @IsString()
  allergy?: string;


  @OneToOne(() => User, (users) => users.patient)
  user: User;
}
