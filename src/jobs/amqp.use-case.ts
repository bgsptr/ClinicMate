import { Inject } from '@nestjs/common';
import * as amqplib from 'amqplib';

export abstract class AmqpUsecase<T> {
  constructor(
    @Inject('AMQP_PROVIDER')
    protected readonly channel: amqplib.Channel,
  ) {}

  async publishWithDelay(message: T, delayTime: number) {
    try {
      const exchangeName = 'notification-reminder';
      const exchangeType = 'x-delayed-message';
      const queueName = 'email-reminder';
      const routingKey = 'email-reminder-key';

      await this.channel.assertExchange(exchangeName, exchangeType, {
        durable: true,
        arguments: {
          'x-delayed-type': 'direct',  // make our change have behaviour like direct exchange
        },
      });
      await this.channel.assertQueue(queueName, { durable: true });
      await this.channel.bindQueue(queueName, exchangeName, routingKey);
      const serializedObj = JSON.stringify(message);
      
      this.channel.publish(exchangeName, routingKey, Buffer.from(serializedObj), {
        contentType: 'application/json',
        headers: {
          'x-delay': delayTime,
        },
        persistent: true,
      });
    } catch (err) {
      console.error(err);
    }
  }
}
