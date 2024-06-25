import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Data } from 'src/common/decorators/data.decorator';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userservice: UserService) {}

  @MessagePattern({ role: 'CHECK-USER_EXIST', cmd: 'check-user-exist' })
  async checkuserexist(@Data() data: any) {
    return await this.userservice.checkuserexist(data);
    // return await this.userservice.checkuserbycondition();
  }

  @MessagePattern({ role: 'CREATE-ADMIN', cmd: 'create-admin' })
  async createAdmin(@Data() data: any) {
    console.log(data);
    return await this.userservice.createAdmin(data);
  }

  // @MessagePattern({role:"CHECK-ADMIN-PRESENT",cmd:"check_admin_present"})
}
