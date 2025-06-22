import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '../task/entities/task.entity';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    // PassportModule,
    // JwtModule.register({
    //   secret: process.env.JWT_SECRET || 'your_jwt_secret',
    //   signOptions: { expiresIn: '7d' },
    // }),
    AuthModule,
  ],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService],
})
export class TaskModule {}
