import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
     
      constructor(private readonly prisma:PrismaService){}

     async checkuserexist(condition:any){
             const user = await this.prisma.user.findFirst({
                     where:condition
             })

             return user;
     }
}
