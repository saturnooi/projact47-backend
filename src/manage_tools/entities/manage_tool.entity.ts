
import { DeviceManagementHistory } from 'src/device-management-history/entities/device-management-history.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class ManageTool {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  img: string;

  @Column()
  type: string;

  @Column()
  company: string;

  @Column()
  price: string;

  @Column()
  unit: string;

  @Column()
  description: string;

  @OneToMany(() => DeviceManagementHistory, (history) => history.manageTools)
  deviceManagementHistory: DeviceManagementHistory[];
}
