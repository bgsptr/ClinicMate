import { CreateScheduleDto } from "src/core/domain/interfaces/dtos/doctors/create-schedule.dto";
import { CreateScheduleMapper } from "src/core/domain/mappers/admins/create-schedule.mapper";
import { ScheduleRepository } from "src/infrastructure/repositories/schedule.repository";

export class UpdateScheduleUsecase {
    constructor(
        public scheduleRepository: ScheduleRepository,
        public createScheduleDto: CreateScheduleDto,
        public createScheduleMapper: CreateScheduleMapper,
    ) {}

    getTime(inputTime: string): Date {
        const [hours, minutes, seconds] = inputTime.split('-').map(Number);

        const date = new Date();
        date.setHours(hours, minutes, seconds);

        const timeLocalString = date.toTimeString();
        console.log(timeLocalString);

        // return timeLocalString.split(' ')[0];
        return date;
    }

    async execute(createScheduleDto: CreateScheduleDto, scheduleId: string) {
        const startTime = this.getTime(createScheduleDto.schedule_start_time);
        const endTime = this.getTime(createScheduleDto.schedule_end_time);
        createScheduleDto.schedule_end_time
        const data = this.createScheduleMapper.mapFromDto(createScheduleDto, scheduleId, startTime, endTime);

        await this.scheduleRepository.updateById(scheduleId, data);

        // return this.createScheduleMapper.ma
    }
}