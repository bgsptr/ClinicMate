import { QueueOutpatient } from "src/use-cases/outpatient/fetch-dashboard/queue-outpatient-list.use-case";
import { QueueDto, QueueInformation } from "../../interfaces/dtos/notifications/queue.dto";
import { ResponseDto } from "../../interfaces/dtos/users/response.dto";
import { IMapper } from "../../interfaces/providers/mapper.provider.interface";

export class QueueNotificationMapper implements IMapper<QueueDto, any, ResponseDto> {
    // mapToDto(queue: QueueOutpatient, secondQueue: QueueOutpatient, ...args: any): QueueDto {
    //     return new QueueDto(
    //         input.total_patient,
    //         input.
    //     )
    // }
}