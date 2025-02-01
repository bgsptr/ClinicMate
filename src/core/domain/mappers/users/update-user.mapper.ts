import { UserEntity } from "../../entities/user.entity";
import { RegisterDto } from "../../interfaces/dtos/users/register.dto";
import { IMapper } from "../../interfaces/providers/mapper.provider.interface";

export class RegisterAccountMapper implements IMapper<RegisterDto, UserEntity> {
    mapFromDto(input: RegisterDto): UserEntity {
        const { email, password } = input;
        return new RegisterDto(
            email,
            password
        )
    }

    // mapToEntity(output: UserEntity): RegisterDto {
    //     return UserEntity(
    //         email,
    //     )
    // }
}