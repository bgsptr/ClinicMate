import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { Register } from "src/use-cases/users/register/register.use-case";
import { UserRepository } from "src/infrastructure/repositories/user.repository";
import { RegisterAccountMapper } from "src/core/domain/mappers/users/register-account.mapper";
import { IHasher } from "src/core/domain/interfaces/providers/bcrypt.provider.interface";
import { Hasher } from "src/provider/bcrypt.provider";

@Module({
    controllers: [UserController],
    providers: [
        UserRepository,
        Hasher,
        RegisterAccountMapper,
        {
            provide: Register,
            useFactory: (
                userRepository: UserRepository, 
                hasher: Hasher, 
                registerAccountMapper: RegisterAccountMapper
            ) => new Register(userRepository, hasher, registerAccountMapper),
            inject: [UserRepository, Hasher, RegisterAccountMapper] 
        }
    ]
})

export class UserModule {}