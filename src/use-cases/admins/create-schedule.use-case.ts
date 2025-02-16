import { CreateScheduleDto } from "src/core/domain/interfaces/dtos/doctors/create-schedule.dto";
import { CreateScheduleMapper } from "src/core/domain/mappers/admins/create-schedule.mapper";
import { ScheduleRepository } from "src/infrastructure/repositories/schedule.repository";
import { TimeUtil } from "src/utils/time.util";
import { v4 as uuidv4 } from 'uuid';

export class CreateScheduleUsecase {
    constructor(
        private readonly scheduleRepository: ScheduleRepository,
        private readonly createScheduleMapper: CreateScheduleMapper
    ) {}

    async execute(createScheduleDto: CreateScheduleDto) {
        const { schedule_start_time, schedule_end_time, schedule_day, id_doctor } = createScheduleDto;

        const schedule = await this.scheduleRepository.checkScheduleExist(schedule_day, id_doctor);
        
        if (schedule) {
            // return 
        }

        const newStartTime = TimeUtil.parseTimeString(schedule_start_time)
        const newEndTime = TimeUtil.parseTimeString(schedule_end_time)
        
        const scheduleEntity = this.createScheduleMapper.mapFromDto(createScheduleDto, uuidv4(), newStartTime, newEndTime);

        const savedSchedule = await this.scheduleRepository.createAndFetch(scheduleEntity);
        
        const start_utc = savedSchedule.start_time.toLocaleTimeString();
        const end_utc = savedSchedule.end_time.toLocaleTimeString();

        const response_start_time = TimeUtil.convertToLocalTimeAnd24HourFormat(start_utc);
        const response_end_time = TimeUtil.convertToLocalTimeAnd24HourFormat(end_utc);
        
        savedSchedule.day = TimeUtil.capitalizeFirstLetter(savedSchedule.day);

        // console.log(savedSchedule.day)
        // console.log(response_start_time)
        const responseData = this.createScheduleMapper.mapFromEntity(savedSchedule, response_start_time, response_end_time);

        return this.createScheduleMapper.mapToResponseJson(
            `success create new schedule with id ${savedSchedule.id_schedule}`,
            responseData
        )
    }
}