import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('items')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async createItem(
    @Body() createItemDto: { name: string; description: string },
  ) {
    return this.appService.createItem(createItemDto);
  }
}
