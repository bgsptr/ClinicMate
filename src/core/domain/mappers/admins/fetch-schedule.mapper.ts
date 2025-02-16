import { SchedulesDto } from "src/use-cases/schedules/master-schedule-access.use-case";
import { ResponseDto } from "../../interfaces/dtos/users/response.dto";
import { IMapper } from "../../interfaces/providers/mapper.provider.interface";
import { ScheduleEntity } from "../../entities/schedule.entity";

export class FetchScheduleMapper implements IMapper<SchedulesDto, ScheduleEntity, ResponseDto> {
    mapFromDto(input: SchedulesDto, ...args: any): ScheduleEntity {
        return new ScheduleEntity(
            input.id_schedule,
            args[0],
            input.day,
            input.start_time,
            input.end_time,
            input.slot
        )
    }

    mapFromEntity(output: ScheduleEntity, ...args: any): SchedulesDto {
        return new SchedulesDto(
            output.id_schedule,
            output.day,
            output.start_time,
            output.end_time,
            output.slot
        )
    }

    mapToResponseJson(message: string, result?: any, isError?: boolean, statusCode?: number): ResponseDto {
        return new ResponseDto(
            false,
            200,
            message,
            result
        )
    }
}