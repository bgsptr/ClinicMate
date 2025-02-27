import { OutpatientEntity } from "../../entities/outpatient.entity";
import { CreateOutpatientDto } from "../../interfaces/dtos/outpatients/create-outpatient.dto";
import { ResponseDto } from "../../interfaces/dtos/users/response.dto";
import { IMapper } from "../../interfaces/providers/mapper.provider.interface";
import { OutpatientStatus, VerificationStatus } from "../../interfaces/types/enum.type";

export class CreateOutpatientMapper implements IMapper<CreateOutpatientDto, OutpatientEntity, ResponseDto> {
    mapFromDto(input: CreateOutpatientDto, outPatientId: string, visitDate: Date, ...args: any): OutpatientEntity {
        return new OutpatientEntity(
            outPatientId,
            String(input.patientId),
            input.doctorId,
            visitDate,
            OutpatientStatus.UNFINISHED,
            VerificationStatus.PENDING
        )
    }

    mapFromEntity(output: OutpatientEntity, visitDateInString: string, ...args: any): CreateOutpatientDto {
        return new CreateOutpatientDto(
            output.id_patient,
            output.id_doctor,
            visitDateInString
        )
    }

    mapToResponseJson(...args: any): ResponseDto {
        return new ResponseDto(
            false,
            201,
            args[0],
            args[1]
        )
    }
}