import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Admin } from 'src/admin/entities/admin.entity';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  card_id: string;

  @Column()
  sex: string;

  @Column()
  position: string;

  @Column()
  address: string;

  @Column()
  birthday: Date;

  @Column({ unique: true })
  email: string;

  @Column()
  prefix: string;

  @Column()
  phone_number: string;

  @Column()
  nationality: string;

  @Column()
  ethnicity: string;

  @OneToOne(() => Admin, (admin) => admin.employee)
  admin: Admin;
}
