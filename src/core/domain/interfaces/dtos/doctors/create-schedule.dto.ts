export class CreateScheduleDto {
    constructor(
        public doctor_name: string,
        public schedule_day: number,
        public schedule_start_time: string,
        public schedule_end_time: string,
        public patient_slot: number
    ) {}
}