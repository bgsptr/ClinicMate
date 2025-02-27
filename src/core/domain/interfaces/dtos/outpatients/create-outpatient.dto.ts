import { OutpatientStatus, VerificationStatus } from "../../types/enum.type";

export class CreateOutpatientDto {
    constructor(
        public doctorId: string,
        public visitDate: string,
        public patientId?: string,
        public outpatientStatus?: OutpatientStatus,
        public verifyStatus?: VerificationStatus,
        public queueNo?: number,
        public outpatientQueueDate?: string,
    ) {}
}