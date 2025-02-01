import { IHasher } from "src/core/domain/interfaces/providers/bcrypt.provider.interface";
import { Register } from "./register.use-case";
import { UserRepository } from "src/infrastructure/repositories/user.repository";
import { Hasher } from "src/provider/bcrypt.provider";
import { RegisterDto } from "src/core/domain/interfaces/dtos/users/register.dto";
import { RegisterAccountMapper } from "src/core/domain/mappers/users/register-account.mapper";

describe('RegisterUsecase', () => {
    let userRepository: UserRepository;
    let hasher: IHasher;
    let registerAccountMapper: RegisterAccountMapper;
    let register: Register;
    let registerDto: RegisterDto;

    const email = 'johndoe@example.com';
    const password = '123456';
    
    beforeEach(async () => {
        userRepository = new UserRepository();
        hasher = new Hasher();
        registerAccountMapper = new RegisterAccountMapper();
        register = new Register(userRepository, hasher, registerAccountMapper);
        registerDto = new RegisterDto(email, password);
    });

    it('should be defined', () => {
        expect(register).toBeDefined();
    })

    it('should create a user', async () => {
        const user = await register.execute(registerDto);
        expect(user).toBeInstanceOf({ email, password });
    })
})