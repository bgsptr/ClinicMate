import { CoreUserInformationDto } from "../../interfaces/dtos/users/core-user-information.dto";
import { ResponseDto } from "../../interfaces/dtos/users/response.dto";
import { IMapper } from "../../interfaces/providers/mapper.provider.interface";
import { PatientEntity } from "../../entities/patient.entity";

export class CorePatientMapper implements IMapper<CoreUserInformationDto, PatientEntity, ResponseDto> {
    mapFromDto(input: CoreUserInformationDto, email: string, birthDate: Date, idPatient: string): PatientEntity {
        return new PatientEntity(
            input.full_name,
            email,
            idPatient,
            birthDate, // still string
            input.gender,
            input.domicile,
            input.phone_number
        )
    }

    mapFromEntity(output: PatientEntity, birth_date: string): CoreUserInformationDto {
        return new CoreUserInformationDto(
            output.name,
            "", // birth place
            birth_date, // birth date
            output.gender, // gender
            output.address,
            output.phone_number
        )
    }
}