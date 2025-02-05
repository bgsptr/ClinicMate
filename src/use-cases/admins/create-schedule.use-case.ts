import { CreateScheduleDto } from "src/core/domain/interfaces/dtos/doctors/create-schedule.dto";
import { CreateScheduleMapper } from "src/core/domain/mappers/admins/create-schedule.mapper";
import { ScheduleRepository } from "src/infrastructure/repositories/schedule.repository";
import { v4 as uuidv4 } from 'uuid';

export class CreateScheduleUsecase {
    constructor(
        private scheduleRepository: ScheduleRepository,
        private createScheduleMapper: CreateScheduleMapper
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

    async execute(createScheduleDto: CreateScheduleDto) {
        const { schedule_start_time, schedule_end_time } = createScheduleDto;
        // const [hours, minutes, seconds] = createScheduleDto.schedule_start_time.split('-').map(Number);

        // const date = new Date();
        // date.setHours(hours, minutes, seconds);

        // const timeLocalString = date.toTimeString();
        // console.log(timeLocalString);
        // const startTimeOnly = timeLocalString.split(' ')[0];

        const newStartTime = this.getTime(schedule_start_time)
        const newEndTime = this.getTime(schedule_end_time)


        
        const scheduleMapped = this.createScheduleMapper.mapFromDto(createScheduleDto, uuidv4(), newStartTime, newEndTime);

        await this.scheduleRepository.create(scheduleMapped);
    }
}