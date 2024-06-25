import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async checkuserexist(condition: any) {
    const user = await this.prisma.user.findFirst({
      where: condition,
    });

    return user;
  }

  async createAdmin(payload: any) {
    try {
      const admin = await this.prisma.user.create({
        data: {
          name: payload?.username,
          email: payload.email,
          password: payload.hashpassword,
          role: 'admin',
        },
      });
      return admin;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
