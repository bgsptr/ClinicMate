export class ScheduleEntity {
    constructor(
        public id_schedule: string,
        public id_doctor: string,
        public day: string,
        public start_time: Date,
        public end_time: Date,
        public slot: number
    ) {}
}