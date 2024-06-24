import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TodoService {
  constructor(private readonly prisma: PrismaService) {}
  async createTodo(data: any) {
    const todo = await this.prisma.todo.create({
      data,
    });
    return todo;
  }
  async getAllTodo() {
    const todo = await this.prisma.todo.findMany({});
    return todo;
  }
}
