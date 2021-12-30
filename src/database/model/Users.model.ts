import {
  Column,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity('Users')
export class Users {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ unique: true })
  public email: string;

  @Column()
  public name: string;

  @Column({ nullable: false })
  public password: string;

  @Column({ nullable: false, default: 1 })
  public accountTypeAdmin: number;

}
