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
import { NotificationProducer } from 'src/jobs/notifications/notification.job.producer';
import { amqpProvider } from 'src/provider/amqp.provider';
import * as amqplib from 'amqplib';
import { NotificationModule } from '../notifications/notification.module';
import { FetchOnlyPatientUsecase } from 'src/use-cases/patients/fetch-only-patient.use-case';

@Module({
  imports: [NotificationModule],
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
    NotificationProducer,
    {
      provide: NotificationProducer,
      useFactory: (
        channel: amqplib.Channel
      ) => new NotificationProducer(channel),
      inject: ["AMQP_PROVIDER"]
    },
    {
      provide: CreateOutpatietUsecase,
      useFactory: (
        outpatientRepository: OutpatientRepository,
        createOutpatientMapper: CreateOutpatientMapper,
        createQueueOutpatientMapper: CreateQueueOutpatientMapper,
        queueOutpatientRepository: QueueOutpatientRepository,
        patientRepository: PatientRepository
      ) =>
        new CreateOutpatietUsecase(
          outpatientRepository,
          createOutpatientMapper,
          createQueueOutpatientMapper,
          queueOutpatientRepository,
          patientRepository
        ),
      inject: [
        OutpatientRepository,
        CreateOutpatientMapper,
        CreateQueueOutpatientMapper,
        QueueOutpatientRepository,
        PatientRepository
      ],
    },
    {
      provide: UpdateVerificationStatusUsecase,
      useFactory: (
        outpatientRepository: OutpatientRepository,
        queueOutpatientRepository: QueueOutpatientRepository,
        scheduleRepository: ScheduleRepository,
        notificationProducer: NotificationProducer,
      ) =>
        new UpdateVerificationStatusUsecase(
          outpatientRepository,
          queueOutpatientRepository,
          scheduleRepository,
          notificationProducer
        ),
      inject: [
        OutpatientRepository,
        QueueOutpatientRepository,
        ScheduleRepository,
        NotificationProducer
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
    {
      provide: FetchOnlyPatientUsecase,
      useFactory: (
        patientRepository: PatientRepository
      ) => new FetchOnlyPatientUsecase(patientRepository),
      inject: [PatientRepository]
    }
  ],
})

export class OutpatientModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('outpatients');
  }
}
