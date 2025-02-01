import { RegisterDto, RegisterKey } from "src/core/domain/interfaces/dtos/users/register.dto";
import { IHasher } from "src/core/domain/interfaces/providers/bcrypt.provider.interface";
import { RegisterAccountMapper } from "src/core/domain/mappers/users/update-user.mapper";
import { UserRepository } from "src/infrastructure/repositories/user.repository";

export class Register {
    constructor(
        private userRepository: UserRepository,
        private hasher: IHasher,
        private updateUserMapper: RegisterAccountMapper
    ) {}

    async execute(registerDto: RegisterDto) {
        const hashedPassword = await this.hasher.hash(registerDto.password);
        registerDto.set(RegisterKey.password, registerDto.password);
        const userEntityObject = this.updateUserMapper.mapFromDto(registerDto);
        return await this.userRepository.create(userEntityObject);
    }
}