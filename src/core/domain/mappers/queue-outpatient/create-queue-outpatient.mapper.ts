import { OutpatientEntity } from "../../entities/outpatient.entity";
import { QueueOutpatientEntity } from "../../entities/queue-outpatient.entity";
import { CreateQueueOutpatientDto } from "../../interfaces/dtos/queue-outpatients/create-queue-outpatient.dto";
import { ResponseDto } from "../../interfaces/dtos/users/response.dto";
import { IMapper } from "../../interfaces/providers/mapper.provider.interface";
import { QueueStatus } from "../../interfaces/types/enum.type";
import { v4 as uuidv4 } from "uuid";

export class CreateQueueOutpatientMapper implements IMapper<CreateQueueOutpatientDto, QueueOutpatientEntity, ResponseDto> {
    mapFromDto(input: CreateQueueOutpatientDto, ...args: any): QueueOutpatientEntity {
        return new QueueOutpatientEntity(
            10,
            input.outpatientId,
            input.queueOutpatientNo,
            QueueStatus.WAITING,
            input.outpatientDate
        )
    }
    mapFromEntity?(output: QueueOutpatientEntity, ...args: any): CreateQueueOutpatientDto;
    mapToResponseJson?(...args: any): ResponseDto;
}