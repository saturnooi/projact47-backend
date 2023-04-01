import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
} from 'typeorm';
  
@Entity()
export class Dentist {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    username: string;
    @Column()
    password: string;
    @Column()
    img: string;
    @Column()
    email: string;
    @Column()
    cardId: string;
    @Column()
    prefix: string;
    @Column()
    first_name: string;
    @Column()
    last_name: string;
    @Column()
    phone_number: string;
    @Column()
    nationality: string;
    @Column()
    ethnicity: string;
    @Column()
    birthday: Date;
    @Column()
    address: string;
    @Column()
    sex: string;
}
