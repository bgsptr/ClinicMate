import { UserEntity } from "src/core/domain/entities/user.entity";
import { RegisterDto, RegisterKey } from "src/core/domain/interfaces/dtos/users/register.dto";
import { IHasher } from "src/core/domain/interfaces/providers/bcrypt.provider.interface";
import { AuthAccountMapper } from "src/core/domain/mappers/users/auth-account.mapper";
import { UserRepository } from "src/infrastructure/repositories/user.repository";
import { Hasher } from "src/provider/bcrypt.provider";

export class Register {
    constructor(
        private userRepository: UserRepository,
        private hasher: Hasher,
        private authAccountMapper: AuthAccountMapper
    ) {}

    async execute(registerDto: RegisterDto): Promise<UserEntity> {
        const hashedPassword = await this.hasher.hash(registerDto.password);
        registerDto.set(RegisterKey.password, hashedPassword);
        const userEntityObject = this.authAccountMapper.mapFromDto(registerDto);
        
        await this.userRepository.create(userEntityObject);

        return userEntityObject;
    }
}