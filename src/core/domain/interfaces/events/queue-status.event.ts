import { QueueStatus } from "../types/enum.type";

export class QueueStatusEvent {
    constructor(
        public id_queue: number,
        public queue_status: QueueStatus,
        public delayTime: number
    ) {}
}