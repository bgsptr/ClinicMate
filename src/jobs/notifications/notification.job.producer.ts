import { Inject } from "@nestjs/common";
import { AmqpUsecase } from "../amqp.use-case";
import aqmplib from 'amqplib';
import { NotificationEvent } from "src/core/domain/interfaces/events/notification.event";

export class NotificationProducer extends AmqpUsecase<NotificationEvent> {
    constructor(
        @Inject("AMQP_PROVIDER")
        protected readonly channel: aqmplib.Channel
    ) {
        super(channel)
    }
}