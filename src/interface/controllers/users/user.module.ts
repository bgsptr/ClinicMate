import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { Register } from "src/use-cases/users/register/register.use-case";
import { UserRepository } from "src/infrastructure/repositories/user.repository";
import { AuthAccountMapper } from "src/core/domain/mappers/users/auth-account.mapper";
import { Hasher } from "src/provider/bcrypt.provider";
import { GetBiodata } from "src/use-cases/users/get-biodata/get-biodata.use-case";
import { Login } from "src/use-cases/users/login/login.use-case";

@Module({
    controllers: [UserController],
    providers: [
        UserRepository,
        Hasher,
        AuthAccountMapper,
        {
            provide: Register,
            useFactory: (
                userRepository: UserRepository, 
                hasher: Hasher, 
                authAccountMapper: AuthAccountMapper
            ) => new Register(userRepository, hasher, authAccountMapper),
            inject: [UserRepository, Hasher, AuthAccountMapper] 
        },
        {
            provide: GetBiodata,
            useFactory: (
                userRepository: UserRepository
            ) => new GetBiodata(userRepository),
            inject: [UserRepository]
        },
        {
            provide: Login,
            useFactory: (
                userRepository: UserRepository,
                hasher: Hasher, 
                authAccountMapper: AuthAccountMapper
            ) => new Login(userRepository, hasher, authAccountMapper),
            inject: [UserRepository, Hasher, AuthAccountMapper]
        }
    ]
})

export class UserModule {}