import { UserEntity } from './../user/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaskStatus } from './task.enum';
import { type } from 'os';

@Entity('Task')
export class TaskEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  @ManyToOne((type) => UserEntity, (user) => user.tasks, { eager: false })
  user: UserEntity;

  @Column()
  userId: number;
}
