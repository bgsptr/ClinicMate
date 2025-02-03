export class DoctorDetailScheduleDto {
    constructor(
        public work_time: string,
        public patient_slot: number,
        public type?: string
    ) {}
}