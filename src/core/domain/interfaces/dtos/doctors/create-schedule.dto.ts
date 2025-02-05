export class CreateScheduleDto {
    constructor(
        public id_doctor: string,
        public schedule_day: string,
        public schedule_start_time: string,
        public schedule_end_time: string,
        public patient_slot: number
    ) {}
}