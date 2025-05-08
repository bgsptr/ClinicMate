import { Inject } from "@nestjs/common";
import amqplib from "amqplib";
import { AmqpUsecase } from "../amqp.use-case";
import { QueueStatusEvent } from "src/core/domain/interfaces/events/queue-status.event";

export class QueueStatusProducer extends AmqpUsecase<QueueStatusEvent> {
    constructor(
        @Inject("AMQP_PROVIDER")
        protected readonly channel: amqplib.Channel
    ) {
        super(channel)
    }
}