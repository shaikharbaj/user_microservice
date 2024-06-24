import { Controller } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { TodoService } from './todo.service';
import { Data } from 'src/common/decorators/data.decorator';

@Controller('todo')
export class TodoController {
    constructor(private todoservice:TodoService){}
     @MessagePattern({role:"CREATE-TODO",cmd:"create-todo"})
     async createTodo(@Data() data:any){
        console.log(data);
        //    return await this.todoservice.createTodo(data);
        throw new RpcException("something went wrong")
     }
     @MessagePattern({ role: 'GET-ALL_TODO', cmd: 'get-all-todo' })
     async getAllTodo(){
           return await this.todoservice.getAllTodo();
     }


}
