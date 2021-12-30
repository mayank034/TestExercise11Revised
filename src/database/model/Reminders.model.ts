import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity('Reminders')
  export class Reminders {
    @PrimaryGeneratedColumn('increment')
    public reminderNumber: number;
  
    @Column({ nullable: false })
    public description: string;
  
    @Column({ nullable: false })
    public createdAt: Date;
  
    @Column({ nullable: false, default: 0 })
    public statusCompleted: boolean;
  }
  