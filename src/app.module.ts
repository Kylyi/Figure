import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { MessagesModule } from './messages/messages.module';
import { MessagesService } from './messages/messages.service';

@Module({
  imports: [MessagesModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController],
  providers: [MessagesService],
})
export class AppModule {}
