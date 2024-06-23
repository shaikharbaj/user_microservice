import { Module } from '@nestjs/common';
import { UserModule,PrismaModule,CategoryModule} from './module/index';

@Module({
  imports: [UserModule,PrismaModule, CategoryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
