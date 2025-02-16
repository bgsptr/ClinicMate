import { Module } from "@nestjs/common";
import { ScheduleControler } from "./schedule.controller";
import { ScheduleRepository } from "src/infrastructure/repositories/schedule.repository";
import { CreateScheduleUsecase } from "src/use-cases/admins/create-schedule.use-case";
import { CreateScheduleMapper } from "src/core/domain/mappers/admins/create-schedule.mapper";
import { UpdateScheduleUsecase } from "src/use-cases/admins/update-schedule.use-case";
import { DeleteScheduleUsecase } from "src/use-cases/admins/delete-schedule.use-case";
import { CreateScheduleDto } from "src/core/domain/interfaces/dtos/doctors/create-schedule.dto";
import { FetchScheduleMapper } from "src/core/domain/mappers/admins/fetch-schedule.mapper";
import { MasterScheduleAccessUsecase } from "src/use-cases/schedules/master-schedule-access.use-case";
import { DoctorRepository } from "src/infrastructure/repositories/doctor.repository";
import { ScheduleDoctorIdUseCase } from "src/use-cases/schedules/schedule-doctorid.use-case";

@Module({
    controllers: [ScheduleControler],
    providers: [
        ScheduleRepository,
        CreateScheduleMapper,
        FetchScheduleMapper,
        CreateScheduleDto,
        DoctorRepository,
        {
            provide: CreateScheduleUsecase,
            useFactory: (
                scheduleRepository: ScheduleRepository,
                createScheduleMapper: CreateScheduleMapper
            ) => new CreateScheduleUsecase(scheduleRepository, createScheduleMapper),
            inject: [ScheduleRepository, CreateScheduleMapper]
        },
        {
            provide: UpdateScheduleUsecase,
            useFactory: (
                scheduleRepository: ScheduleRepository,
                createScheduleDto: CreateScheduleDto,
                createScheduleMapper: CreateScheduleMapper
            ) => new UpdateScheduleUsecase(scheduleRepository, createScheduleDto, createScheduleMapper),
            inject: [ScheduleRepository, CreateScheduleDto, CreateScheduleMapper]
        },
        {
            provide: DeleteScheduleUsecase,
            useFactory: (
                scheduleRepository: ScheduleRepository,
                fetchScheduleMapper: FetchScheduleMapper
            ) => new DeleteScheduleUsecase(scheduleRepository, fetchScheduleMapper),
            inject: [ScheduleRepository, FetchScheduleMapper]
        },
        {
            provide: MasterScheduleAccessUsecase,
            useFactory: (
                scheduleRepository: ScheduleRepository,
                doctorRepository : DoctorRepository,
                fetchScheduleMapper: FetchScheduleMapper
            ) => new MasterScheduleAccessUsecase(scheduleRepository, doctorRepository, fetchScheduleMapper),
            inject: [ScheduleRepository, DoctorRepository, FetchScheduleMapper]
        },
        {
            provide: ScheduleDoctorIdUseCase,
            useFactory: (
                scheduleRepository: ScheduleRepository,
                doctorRepository : DoctorRepository
            ) => new ScheduleDoctorIdUseCase(scheduleRepository, doctorRepository),
            inject: [ScheduleRepository, DoctorRepository]
        }
    ]
})

export class ScheduleModule {}