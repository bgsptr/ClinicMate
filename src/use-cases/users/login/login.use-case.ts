import { LoginDto } from "src/core/domain/interfaces/dtos/users/login.dto";
import { AuthAccountMapper } from "src/core/domain/mappers/users/auth-account.mapper";
import { UserRepository } from "src/infrastructure/repositories/user.repository";
import { Hasher } from "src/provider/bcrypt.provider";

export class Login {
    constructor(
        private readonly userRepository: UserRepository,
        private hasher: Hasher,
        private authAccountMapper: AuthAccountMapper
    ) {}

    async execute(loginDto: LoginDto) {
        const { email, password } = this.authAccountMapper.mapFromDto(loginDto);
        const user = await this.userRepository.findByEmail(email);
        // console.log(password);
        // console.log(user?.password);
        const passwordIsMatch  = await this.hasher.compare(password, user?.password);

        return this.authAccountMapper.mapToResponseJson(
            passwordIsMatch,
            !passwordIsMatch ? "User not found" : "User successfully authenticated"
        )
    }
}