import { OutpatientStatus, VerificationStatus } from "../interfaces/types/enum.type";

export class OutpatientEntity {
    constructor(
        public id_rawat_jalan: string,
        public id_patient: string,
        public id_doctor: string,
        public visit_date: Date,
        public status_rawat_jalan: OutpatientStatus,
        public verifikasi_status: VerificationStatus | null
    ) {}
}