import { Module } from "@nestjs/common";
import { OutpatientController } from "./outpatient.controller";
import { OutpatientRepository } from "src/infrastructure/repositories/outpatient.repository";
import { CreateOutpatietUsecase } from "src/use-cases/outpatient/create-outpatient.use-case";
import { UpdateVerificationStatusUsecase } from "src/use-cases/outpatient/update-verification.use-case";
import { FetchOutpatientsWithoutFilterUsecase } from "src/use-cases/outpatient/fetch-outpatients.use-case";
import { CreateOutpatientMapper } from "src/core/domain/mappers/outpatients/create-outpatient.mapper";
import { PatientRepository } from "src/infrastructure/repositories/patient.repository";
import { DoctorRepository } from "src/infrastructure/repositories/doctor.repository";
import { QueueOutpatientRepository } from "src/infrastructure/repositories/queue-outpatient.repsoitory";


@Module({
    controllers: [OutpatientController],
    providers: [
        OutpatientRepository,
        PatientRepository,
        DoctorRepository,
        QueueOutpatientRepository,
        CreateOutpatientMapper,
        CreateOutpatietUsecase,
        UpdateVerificationStatusUsecase,
        FetchOutpatientsWithoutFilterUsecase,
        {
            provide: CreateOutpatietUsecase,
            useFactory: (
                outpatientRepository: OutpatientRepository,
                createOutpatientMapper: CreateOutpatientMapper
            ) => new CreateOutpatietUsecase(outpatientRepository, createOutpatientMapper),
            inject: [OutpatientRepository, CreateOutpatientMapper]
        },
        {
            provide: UpdateVerificationStatusUsecase,
            useFactory: (
                outpatientRepository: OutpatientRepository,
            ) => new UpdateVerificationStatusUsecase(outpatientRepository),
            inject: [OutpatientRepository]
        },
        {
            provide: FetchOutpatientsWithoutFilterUsecase,
            useFactory: (
                outpatientRepository: OutpatientRepository,
                patientRepository: PatientRepository,
                doctorRepository: DoctorRepository,
                queueOutpatientRepository: QueueOutpatientRepository,
            ) => new FetchOutpatientsWithoutFilterUsecase(outpatientRepository, patientRepository, doctorRepository, queueOutpatientRepository),
            inject: [OutpatientRepository, PatientRepository, DoctorRepository, QueueOutpatientRepository]
        }
    ]
})

export class OutpatientModule {}