import { MiddlewareConsumer, Module } from '@nestjs/common';
import { OutpatientController } from './outpatient.controller';
import { OutpatientRepository } from 'src/infrastructure/repositories/outpatient.repository';
import { CreateOutpatietUsecase } from 'src/use-cases/outpatient/create-outpatient.use-case';
import { UpdateVerificationStatusUsecase } from 'src/use-cases/outpatient/update-verification.use-case';
import { FetchOutpatientsWithoutFilterUsecase } from 'src/use-cases/outpatient/fetch-outpatients.use-case';
import { CreateOutpatientMapper } from 'src/core/domain/mappers/outpatients/create-outpatient.mapper';
import { PatientRepository } from 'src/infrastructure/repositories/patient.repository';
import { DoctorRepository } from 'src/infrastructure/repositories/doctor.repository';
import { QueueOutpatientRepository } from 'src/infrastructure/repositories/queue-outpatient.repsoitory';
import { ScheduleRepository } from 'src/infrastructure/repositories/schedule.repository';
import { CreateQueueOutpatientMapper } from 'src/core/domain/mappers/queue-outpatient/create-queue-outpatient.mapper';
import { AuthMiddleware } from 'src/interface/middlewares/auth.middleware';

@Module({
  controllers: [OutpatientController],
  providers: [
    OutpatientRepository,
    PatientRepository,
    DoctorRepository,
    QueueOutpatientRepository,
    ScheduleRepository,
    CreateQueueOutpatientMapper,
    CreateOutpatientMapper,
    CreateOutpatietUsecase,
    UpdateVerificationStatusUsecase,
    FetchOutpatientsWithoutFilterUsecase,
    {
      provide: CreateOutpatietUsecase,
      useFactory: (
        outpatientRepository: OutpatientRepository,
        createOutpatientMapper: CreateOutpatientMapper,
        createQueueOutpatientMapper: CreateQueueOutpatientMapper,
        queueOutpatientRepository: QueueOutpatientRepository,
      ) =>
        new CreateOutpatietUsecase(
          outpatientRepository,
          createOutpatientMapper,
          createQueueOutpatientMapper,
          queueOutpatientRepository,
        ),
      inject: [
        OutpatientRepository,
        CreateOutpatientMapper,
        CreateQueueOutpatientMapper,
        QueueOutpatientRepository,
      ],
    },
    {
      provide: UpdateVerificationStatusUsecase,
      useFactory: (
        outpatientRepository: OutpatientRepository,
        queueOutpatientRepository: QueueOutpatientRepository,
        scheduleRepository: ScheduleRepository,
      ) =>
        new UpdateVerificationStatusUsecase(
          outpatientRepository,
          queueOutpatientRepository,
          scheduleRepository,
        ),
      inject: [
        OutpatientRepository,
        QueueOutpatientRepository,
        ScheduleRepository,
      ],
    },
    {
      provide: FetchOutpatientsWithoutFilterUsecase,
      useFactory: (
        outpatientRepository: OutpatientRepository,
        patientRepository: PatientRepository,
        doctorRepository: DoctorRepository,
        queueOutpatientRepository: QueueOutpatientRepository,
      ) =>
        new FetchOutpatientsWithoutFilterUsecase(
          outpatientRepository,
          patientRepository,
          doctorRepository,
          queueOutpatientRepository,
        ),
      inject: [
        OutpatientRepository,
        PatientRepository,
        DoctorRepository,
        QueueOutpatientRepository,
      ],
    },
  ],
})
export class OutpatientModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('outpatients');
  }
}
