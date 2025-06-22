import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '../task/entities/task.entity';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { AuthModule } from 'src/auth/auth.module';
import { TaskGateway } from './task.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), AuthModule],
  controllers: [TaskController],
  providers: [TaskService, TaskGateway],
  exports: [TaskService, TaskGateway],
})
export class TaskModule {}
