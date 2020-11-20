import { Controller, Get } from '@nestjs/common';
import { MessagesService } from './messages/messages.service';

@Controller()
export class AppController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  async getHello() {
    await this.messagesService.sendMessage(new Date().toISOString());
    return 'Hello world!';
  }
}
