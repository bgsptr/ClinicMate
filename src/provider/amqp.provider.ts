import { Provider } from '@nestjs/common';
import * as amqplib from 'amqplib';

export const amqpProvider: Provider = {
  provide: 'AMQP_PROVIDER',
  useFactory: async (): Promise<amqplib.Channel> => {
    const conn = await amqplib.connect(`amqp://guest:guest@localhost:5672`);
    return await conn.createChannel();
  },
};
