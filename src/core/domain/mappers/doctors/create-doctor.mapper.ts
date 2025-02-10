import { DoctorEntity } from "../../entities/doctor.entity";
import { AssignDoctorDto } from "../../interfaces/dtos/admins/assign-doctor.dto";
import { ResponseDto } from "../../interfaces/dtos/users/response.dto";
import { IMapper } from "../../interfaces/providers/mapper.provider.interface";

export class CreateDoctorMapper implements IMapper<AssignDoctorDto, DoctorEntity, ResponseDto> {
    mapFromDto(input: AssignDoctorDto, ...args: any): DoctorEntity {
        return new DoctorEntity(
            args[0],
            input.name,
            input.address,
            input.phoneNumber,
            input.email,
        )
    }

    mapFromEntity(output: DoctorEntity, ...args: any): AssignDoctorDto {
        return new AssignDoctorDto(
            output.name,
            output.address,
            output.phone_number,
            output.email
        )
    }

    mapToResponseJson(...args: any): ResponseDto {
        return new ResponseDto(
            args[0],
            args[1],
            args[2],
            args[3],
        )
    }
}