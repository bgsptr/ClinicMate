import { VerificationStatus } from "../../types/enum.type";

export class ShowOutpatientDto {
    constructor(
        public outpatient_id: string, // rawat jalan
        public consult_date: string, // rawat jalan
        public start_time: string, // queue rawat jalan
        public end_time: string, // queue rawat jalan
        public queue_no: number, // queue rawat jalan
        public patient_id: string, // patient
        public patient_name: string, // patient
        public doctor_name: string, // doctor
        public verify_status: VerificationStatus, // rawat jalan
        public created_at?: string, // rawat jalan
        public queue_time?: string, // queue rawat jalan
    ) {}
}