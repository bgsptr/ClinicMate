import { ScheduleEntity } from "../../entities/schedule.entity";
import { CreateScheduleDto } from "../../interfaces/dtos/doctors/create-schedule.dto";
import { ResponseDto } from "../../interfaces/dtos/users/response.dto";
import { IMapper } from "../../interfaces/providers/mapper.provider.interface";

export class CreateScheduleMapper implements IMapper<CreateScheduleDto, ScheduleEntity, ResponseDto> {
    mapFromDto(input: CreateScheduleDto, idSchedule: string, startTime: Date, endTime: Date): ScheduleEntity {
        return new ScheduleEntity(
            idSchedule,
            input.id_doctor,
            input.schedule_day,
            startTime,
            endTime,
            input.patient_slot
        )
    }

    mapFromEntity(output: ScheduleEntity, ...args: any): CreateScheduleDto {
        return new CreateScheduleDto(
            output.id_doctor,
            output.day,
            args[0],
            args[1],
            output.slot
        )
    }

    // mapToResponseJson(...args: any): ResponseDto {
        
    // }
}