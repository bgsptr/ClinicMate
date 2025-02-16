import { CreateOutpatientDto } from "src/core/domain/interfaces/dtos/outpatients/create-outpatient.dto";
import { CreateOutpatientMapper } from "src/core/domain/mappers/outpatients/create-outpatient.mapper";
import { OutpatientRepository } from "src/infrastructure/repositories/outpatient.repository";
import { TimeUtil } from "src/utils/time.util";

export class CreateOutpatietUsecase {
    constructor(
        private readonly outpatientRepository: OutpatientRepository,
        private readonly createOutpatientMapper: CreateOutpatientMapper
    ) {}

    async execute(outpatientDto: CreateOutpatientDto) {
        const date = TimeUtil.parseTimeString(outpatientDto.visitDate);
        console.log(date);
        // const outpatientEntity = this.createOutpatientMapper.mapFromDto(outpatientDto, date);
        // await this.outpatientRepository.create(outpatientEntity);
    }
}