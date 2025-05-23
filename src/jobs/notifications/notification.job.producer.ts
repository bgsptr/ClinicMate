import { Inject } from "@nestjs/common";
import { AmqpUsecase } from "../amqp.use-case";
import amqplib from 'amqplib';
import { NotificationEvent } from "src/core/domain/interfaces/events/notification.event";

export class NotificationProducer extends AmqpUsecase<NotificationEvent> {
    constructor(
        @Inject("AMQP_PROVIDER")
        protected readonly channel: amqplib.Channel
    ) {
        super(channel)
    }
}