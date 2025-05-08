export interface QueueInformation {
    queue_no: number,
    patient_id: string,
    patient_name: string,
    doctor_id: string,
    doctor_name: string,
    start_consult_time: string,
    end_consult_time: string,
}

export class QueueDto {
    constructor(
        public total_patient: number,
        public total_queue_processed: number,
        public total_queue_finished: number,
        public today_total_queue: number,
        public current_queue_patient: QueueInformation | null,
        public next_queue_patient: QueueInformation | null
    ) {}
}