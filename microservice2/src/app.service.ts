import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AppService {
  constructor(@InjectModel('Item') private itemModel: Model<any>) {}

  async handleItemCreated(data: any): Promise<void> {
    console.log(data, 'AAAA');

    // const createdItem = new this.itemModel(data);
    // await createdItem.save();
    // console.log('Item saved:', createdItem);
  }
}
