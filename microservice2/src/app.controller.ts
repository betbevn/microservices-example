import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { ItemCreatedEvent } from './schemas/item-created.event';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('item_created')
  async handleItemCreated(@Payload() data: ItemCreatedEvent) {
    await this.appService.handleItemCreated(data);
  }
}
