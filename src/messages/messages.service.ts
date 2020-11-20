import { Injectable } from '@nestjs/common';
import { Producer } from 'sqs-producer';
import { ConfigService } from '@nestjs/config';
import { SQS } from 'aws-sdk';
import { Consumer } from 'sqs-consumer';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MessagesService {
  private producer: Producer;
  private consumer: Consumer;

  constructor(private configService: ConfigService) {
    const QUEUE_URL = this.configService.get<string>('QUEUE_URL');
    const ACCESS_KEY_ID = this.configService.get<string>('ACCESS_KEY_ID');
    const SECRET_ACCESS_KEY = this.configService.get<string>(
      'SECRET_ACCESS_KEY',
    );
    const REGION = this.configService.get<string>('REGION');

    // SQS
    const sqs = new SQS({
      accessKeyId: ACCESS_KEY_ID,
      secretAccessKey: SECRET_ACCESS_KEY,
      region: REGION,
    });

    // HANDLER - PRODUCER
    this.producer = Producer.create({
      queueUrl: QUEUE_URL,
      sqs,
    });

    // HANDLER - RECEIVER
    this.consumer = Consumer.create({
      queueUrl: QUEUE_URL,
      sqs,

      handleMessage: (msg: SQS.Message) => this.receiveMessage(msg),
    });
    this.consumer.start();
  }

  async sendMessage(msgBody: any) {
    await this.producer.send({
      id: uuidv4(),
      body: msgBody,
      groupId: 'group1234',
    });
  }

  async receiveMessage(msg: SQS.Message) {
    console.log(msg);
  }
}
