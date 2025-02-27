import { CreateOutpatientDto } from "src/core/domain/interfaces/dtos/outpatients/create-outpatient.dto";
import { CreateQueueOutpatientDto } from "src/core/domain/interfaces/dtos/queue-outpatients/create-queue-outpatient.dto";
import { CreateOutpatientMapper } from "src/core/domain/mappers/outpatients/create-outpatient.mapper";
import { CreateQueueOutpatientMapper } from "src/core/domain/mappers/queue-outpatient/create-queue-outpatient.mapper";
import { OutpatientRepository } from "src/infrastructure/repositories/outpatient.repository";
import { QueueOutpatientRepository } from "src/infrastructure/repositories/queue-outpatient.repsoitory";
import { TimeUtil } from "src/utils/time.util";
import { v4 as uuidv4 } from "uuid";

export class CreateOutpatietUsecase {
    constructor(
        private readonly outpatientRepository: OutpatientRepository,
        private readonly createOutpatientMapper: CreateOutpatientMapper,
        private readonly createQueueOutpatientMapper: CreateQueueOutpatientMapper,
        private readonly queueOutpatientRepository: QueueOutpatientRepository,
    ) {}

    async execute(outpatientDto: CreateOutpatientDto) {
        const queueDate = TimeUtil.parseTimeString(outpatientDto.visitDate);
        const { queueNo, outpatientQueueDate, ...outpatientDtoRest } = outpatientDto;
        console.log(queueDate);
        const outpatientCreatedAt = new Date();

        console.log(outpatientCreatedAt);
        
        const outpatientId = uuidv4();
        const outpatientEntity = this.createOutpatientMapper.mapFromDto(outpatientDtoRest, outpatientId, outpatientCreatedAt);
        const { id_rawat_jalan: outpatientIdVerified } = await this.outpatientRepository.create(outpatientEntity);

        if (!outpatientIdVerified || !outpatientQueueDate || !queueNo ) return;
        //throw

        const queueOutpatientDto = new CreateQueueOutpatientDto(outpatientIdVerified, queueNo, outpatientQueueDate);
        const queueEntity = this.createQueueOutpatientMapper.mapFromDto(queueOutpatientDto);
        await this.queueOutpatientRepository.create(queueEntity);
    }
}