import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ListEntity } from '../list/list.entity';

@Entity('todo')
export class TodoEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn()
  created!: Date;

  @UpdateDateColumn()
  updated!: Date;

  @Column()
  title!: string;

  @Column({ nullable: true })
  completed!: Date | null;

  @ManyToOne(() => ListEntity, (list) => list.todos, { nullable: false })
  @JoinColumn({ name: 'list_id' })
  list!: ListEntity;

  @ManyToOne(() => TodoEntity, (parent) => parent.children)
  @JoinColumn({ name: 'parent_id' })
  parent: TodoEntity;

  @OneToMany(() => TodoEntity, (child) => child.parent)
  children: TodoEntity[];

  @Column({ nullable: true, name: 'google_id' })
  googleId: string | null;
}
