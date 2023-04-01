import { ManageTool } from 'src/manage_tools/entities/manage_tool.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
@Entity()
export class DeviceManagementHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  amount: number;

  @Column()
  remainingAmount: number;

  @Column()
  date: Date;

  @Column({ nullable: true })
  expirationDate?: Date;

  @Column()
  details: string;

  @Column()
  manageToolsId: number;

  @ManyToOne(() => ManageTool, (manageTools) => manageTools, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  manageTools: ManageTool;
}
