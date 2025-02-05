import { CreateScheduleDto } from "src/core/domain/interfaces/dtos/doctors/create-schedule.dto";
import { CreateScheduleMapper } from "src/core/domain/mappers/admins/create-schedule.mapper";
import { FetchScheduleMapper } from "src/core/domain/mappers/admins/fetch-schedule.mapper";
import { ScheduleRepository } from "src/infrastructure/repositories/schedule.repository";
import { v4 as uuidv4 } from 'uuid';

export class DeleteScheduleUsecase {
    constructor(
        private scheduleRepository: ScheduleRepository,
        private fetchScheduleMapper: FetchScheduleMapper,
    ) {}

    async execute(scheduleId: string) {
        const schedule = await this.scheduleRepository.findByScheduleId(scheduleId);
        
        if (!schedule) // throw error

        return this.fetchScheduleMapper.mapToResponseJson(
            `successfully delete schedule with id: ${scheduleId}`
        )
    }
}