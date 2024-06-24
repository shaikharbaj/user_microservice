import { Module } from '@nestjs/common';
import { UserModule,PrismaModule,CategoryModule} from './module/index';
import { TodoModule } from './module/todo/todo.module';

@Module({
  imports: [UserModule,PrismaModule, CategoryModule, TodoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
