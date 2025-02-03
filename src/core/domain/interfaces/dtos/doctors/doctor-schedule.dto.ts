export class DoctorScheduleDto {
    constructor(
        public doctor_name: string,
        public schedule_day: string,
        public status: boolean
    ) {}
}