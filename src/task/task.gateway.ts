// src/task/task.gateway.ts
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Task } from './entities/task.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
@WebSocketGateway({
  cors: {
    origin: '*', // allow all for now
  },
})
export class TaskGateway {
  @WebSocketServer()
  server: Server;

  taskCreated(task: Task) {
    this.server.emit('taskCreated', task);
  }

  taskUpdated(task: Task) {
    this.server.emit('taskUpdated', task);
  }

  taskDeleted(taskId: string) {
    this.server.emit('taskDeleted', taskId);
  }
}
