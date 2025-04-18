import { Module } from "@nestjs/common";
import { DoctorController } from "./doctor.controller";
import { CreateDoctorUsecase } from "src/use-cases/doctors/create-doctor.use-case";
import { CreateDoctorMapper } from "src/core/domain/mappers/doctors/create-doctor.mapper";
import { DoctorRepository } from "src/infrastructure/repositories/doctor.repository";
import { UserRepository } from "src/infrastructure/repositories/user.repository";
import { FindDoctorUsecase } from "src/use-cases/doctors/find-doctor.use-case";
import { UpdateDoctorUsecase } from "src/use-cases/doctors/update-doctor.use-case";
import { ShowAllDoctorUsecase } from "src/use-cases/doctors/show-all-doctor.use-case";
import { FetchAvailableQueueUsecase } from "src/use-cases/doctors/queue/fetch-available-queue.use-case";
import { ScheduleRepository } from "src/infrastructure/repositories/schedule.repository";
import { QueueOutpatientRepository } from "src/infrastructure/repositories/queue-outpatient.repsoitory";

@Module({
    controllers: [DoctorController],
    providers: [
        DoctorRepository,
        UserRepository,
        ScheduleRepository,
        QueueOutpatientRepository,
        CreateDoctorMapper,
        {
            provide: CreateDoctorUsecase,
            useFactory: (
                doctorRepository: DoctorRepository,
                userRepository: UserRepository,
                createDoctorMapper: CreateDoctorMapper
            ) => new CreateDoctorUsecase(doctorRepository, userRepository, createDoctorMapper),
            inject: [DoctorRepository, UserRepository, CreateDoctorMapper]
        },
        {
            provide: FindDoctorUsecase,
            useFactory: (
                doctorRepository: DoctorRepository,
                createDoctorMapper: CreateDoctorMapper
            ) => new FindDoctorUsecase(doctorRepository, createDoctorMapper),
            inject: [DoctorRepository, CreateDoctorMapper]
        },
        {
            provide: UpdateDoctorUsecase,
            useFactory: (
                doctorRepository: DoctorRepository,
                createDoctorMapper: CreateDoctorMapper
            ) => new UpdateDoctorUsecase(doctorRepository, createDoctorMapper),
            inject: [DoctorRepository, CreateDoctorMapper]
        },
        {
            provide: ShowAllDoctorUsecase,
            useFactory: (
                doctorRepository: DoctorRepository,
                createDoctorMapper: CreateDoctorMapper
            ) => new ShowAllDoctorUsecase(doctorRepository, createDoctorMapper),
            inject: [DoctorRepository, CreateDoctorMapper]
        },
        {
            provide: FetchAvailableQueueUsecase,
            useFactory: (
                scheduleRepository: ScheduleRepository,
                queueOutpatientRepository: QueueOutpatientRepository
            ) => new FetchAvailableQueueUsecase(scheduleRepository, queueOutpatientRepository),
            inject: [ScheduleRepository, QueueOutpatientRepository]
        }
    ]
})

export class DoctorModule {}