import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { TaskGateway } from './task.gateway';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,
    private readonly taskGateway: TaskGateway,
  ) {}

  async create(taskData: Partial<Task>): Promise<Task> {
    const task = this.taskRepo.create(taskData);
    this.taskGateway.taskCreated(task);
    return this.taskRepo.save(task);
  }

  async findAll(): Promise<Task[]> {
    return this.taskRepo.find();
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskRepo.findOne({ where: { id } });
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async update(id: string, updateData: Partial<Task>): Promise<Task> {
    await this.taskRepo.update(id, updateData);
    const task = await this.findOne(id);
    this.taskGateway.taskUpdated(task);
    return task;
  }

  async remove(id: string): Promise<void> {
    await this.taskRepo.delete(id);
    this.taskGateway.taskDeleted(id);
    return;
  }
}
