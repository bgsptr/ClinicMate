import { UserEntity } from "../../entities/user.entity";
import { LoginDto } from "../../interfaces/dtos/users/login.dto";
import { RegisterDto } from "../../interfaces/dtos/users/register.dto";
import { ResponseDto } from "../../interfaces/dtos/users/response.dto";
import { IMapper } from "../../interfaces/providers/mapper.provider.interface";

export class AuthAccountMapper implements IMapper<RegisterDto | LoginDto, UserEntity, ResponseDto> {
    mapFromDto(input: RegisterDto | LoginDto): UserEntity {
        const { email, password } = input;
        return new UserEntity(
            email,
            password
        )
    }

    mapToResponseJson(status: boolean, message: string, output?: UserEntity): ResponseDto {
        return new ResponseDto(
            status,
            message
        )
    }
}