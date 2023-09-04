import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { TodoEntity } from '../todo/todo.entity';

@Entity('list')
export class ListEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn()
  created!: Date;

  @UpdateDateColumn()
  updated!: Date;

  @Column()
  title!: string;

  @OneToMany(() => TodoEntity, (todo) => todo.list)
  todos: TodoEntity[];
}
