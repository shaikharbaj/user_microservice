import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  MicroserviceOptions,
  RpcException,
  Transport,
} from '@nestjs/microservices';
import { Logger, ValidationPipe } from '@nestjs/common';
const logger = new Logger('Microservice');
async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  // await app.listen(3000);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: 8002,
      },
    },
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //Remove unknown parameter from payload
      forbidNonWhitelisted: false, //Display error if we have some unknown parameter in request payload
      transform: true,
      forbidUnknownValues: false,
      disableErrorMessages: false,
      validateCustomDecorators: true,
      exceptionFactory: (errors) => {
        return new RpcException({
          statusCode: 422,
          error: 'Unprocessable Entity',
          message: errors.reduce(
            (acc, e) => ({
              ...acc,
              [e.property]: Object.values(e.constraints),
            }),
            {},
          ),
        });
      },
    }),
  );
  await app.listen();
  logger.log('User microservice is listening at port ' + 8002);
}
bootstrap();
