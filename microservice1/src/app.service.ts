import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AppService {
  private client: ClientProxy;

  constructor(@InjectModel('Item') private itemModel: Model<any>) {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://rabbitmq:5672'],
        queue: 'main_queue',
        queueOptions: {
          durable: false,
        },
      },
    });
  }

  async createItem(data: any): Promise<any> {
    const createdItem = new this.itemModel(data);
    await createdItem.save();
    this.client.emit('item_created', createdItem);
    return createdItem;
  }
}
