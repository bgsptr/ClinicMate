import { OutpatientStatus, VerificationStatus } from "../../types/enum.type";

export class CreateOutpatientDto {
    constructor(
        public patientId: string,
        public doctorId: string,
        public visitDate: string,
        public outpatientStatus?: OutpatientStatus,
        public verifyStatus?: VerificationStatus
    ) {}
}