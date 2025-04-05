import { Module } from "@nestjs/common";
import { amqpProvider } from "src/provider/amqp.provider";

@Module({
    providers: [amqpProvider],
    exports: [amqpProvider]
})

export class NotificationModule {}