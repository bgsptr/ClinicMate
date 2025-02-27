import { QueueStatus } from "../interfaces/types/enum.type";

export class QueueOutpatientEntity {
    constructor(
        public id_queue: number,
        public id_rawat_jalan: string,
        public queue_no: number,
        public queue_status: QueueStatus,
        public rawat_jalan_date: string,
        public queue_start_time?: string,
        public queue_end_time?: string,
    ) {}
}