import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  // Create the HTTP server
  const app = await NestFactory.create(AppModule);
  app.listen(3000, () => console.log('HTTP server listening on port 3000'));

  // Create the RabbitMQ microservice
  const microservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://rabbitmq:5672'],
        queue: 'main_queue',
        queueOptions: {
          durable: false,
        },
      },
    });

  await microservice.listen();
}
bootstrap();
