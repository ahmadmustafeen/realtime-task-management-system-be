// src/task/entities/task.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'enum', enum: ['todo', 'in_progress', 'done'] })
  status: 'todo' | 'in_progress' | 'done';

  @Column({ type: 'enum', enum: ['low', 'medium', 'high'] })
  priority: 'low' | 'medium' | 'high';

  @Column()
  createdBy: string;

  @Column({ nullable: true })
  assignedTo?: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isDeleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
