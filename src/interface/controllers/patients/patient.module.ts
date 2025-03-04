import { MiddlewareConsumer, Module } from "@nestjs/common";
import { PatientController } from "./patient.controller";
import { PatientRepository } from "src/infrastructure/repositories/patient.repository";
import { CorePatientMapper } from "src/core/domain/mappers/users/core-patient.mapper";
import { CreatePatientInformationUsecase } from "src/use-cases/patients/create-information/create-information.use-case";
import { ShowInformationUsecase } from "src/use-cases/patients/show-information/show-information.use-case";
import { FetchAllPatientUsecase } from "src/use-cases/patients/fetch-all-patient.use-case";
import { AuthMiddleware } from "src/interface/middlewares/auth.middleware";

@Module({
    controllers: [PatientController],
    providers: [
        PatientRepository,
        CorePatientMapper,
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