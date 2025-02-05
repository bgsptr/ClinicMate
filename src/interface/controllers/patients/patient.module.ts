import { Module } from "@nestjs/common";
import { PatientController } from "./patient.controller";
import { PatientRepository } from "src/infrastructure/repositories/patient.repository";
import { CorePatientMapper } from "src/core/domain/mappers/users/core-patient.mapper";
import { CreatePatientInformationUsecase } from "src/use-cases/patients/create-information/create-information.use-case";
import { ShowInformationUsecase } from "src/use-cases/patients/show-information/show-information.use-case";

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
        }
    ]
})

export class PatientModule {}