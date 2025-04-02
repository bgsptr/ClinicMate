import { MiddlewareConsumer, Module } from "@nestjs/common";
import { PatientController } from "./patient.controller";
import { PatientRepository } from "src/infrastructure/repositories/patient.repository";
import { CorePatientMapper } from "src/core/domain/mappers/users/core-patient.mapper";
import { CreatePatientInformationUsecase } from "src/use-cases/patients/create-information/create-information.use-case";
import { ShowInformationUsecase } from "src/use-cases/patients/show-information/show-information.use-case";
import { FetchAllPatientUsecase } from "src/use-cases/patients/fetch-all-patient.use-case";
import { AuthMiddleware } from "src/interface/middlewares/auth.middleware";
import { Register } from "src/use-cases/users/register/register.use-case";
import { UserRepository } from "src/infrastructure/repositories/user.repository";
import { AuthAccountMapper } from "src/core/domain/mappers/users/auth-account.mapper";
import { Hasher } from "src/provider/bcrypt.provider";

@Module({
    controllers: [PatientController],
    providers: [
        PatientRepository,
        CorePatientMapper,
        UserRepository,
        Hasher,
        AuthAccountMapper,
        {
            provide: CreatePatientInformationUsecase,
            useFactory: (
                patientRepository: PatientRepository,
                corePatientMapper: CorePatientMapper
            ) => new CreatePatientInformationUsecase(patientRepository, corePatientMapper),
            inject: [PatientRepository, CorePatientMapper]
        },
        {
            provide: ShowInformationUsecase,
            useFactory: (
                patientRepository: PatientRepository,
                corePatientMapper: CorePatientMapper
            ) => new CreatePatientInformationUsecase(patientRepository, corePatientMapper),
            inject: [PatientRepository, CorePatientMapper]
        },
        {
            provide: FetchAllPatientUsecase,
            useFactory: (
                patientRepository: PatientRepository,
                corePatientMapper: CorePatientMapper,
            ) => new FetchAllPatientUsecase(patientRepository, corePatientMapper),
            inject: [PatientRepository, CorePatientMapper]
        },
        {
            provide: Register,
            useFactory: (
                userRepository: UserRepository,
                hasher: Hasher,
                authAccountMapper: AuthAccountMapper
            ) => new Register(userRepository, hasher, authAccountMapper),
            inject: [UserRepository, Hasher, AuthAccountMapper]
        }
    ]
})

export class PatientModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
        .apply(AuthMiddleware)
        .forRoutes('patients');
    }
}