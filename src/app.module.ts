import { Module } from '@nestjs/common';
import { UserModule } from './module/index';

@Module({
  imports: [UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
