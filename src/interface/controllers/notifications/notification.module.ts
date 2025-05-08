import { MiddlewareConsumer, Module } from '@nestjs/common';
import { amqpProvider } from 'src/provider/amqp.provider';
import { NotificationController } from './notification.controller';
import { QueueOutpatientListUsecase } from 'src/use-cases/outpatient/fetch-dashboard/queue-outpatient-list.use-case';
import { QueueOutpatientRepository } from 'src/infrastructure/repositories/queue-outpatient.repsoitory';
import { PatientRepository } from 'src/infrastructure/repositories/patient.repository';
import { DoctorRepository } from 'src/infrastructure/repositories/doctor.repository';
import { QueueNotificationMapper } from 'src/core/domain/mappers/notifications/queue-notification.mapper';
import { AuthMiddleware } from 'src/interface/middlewares/auth.middleware';

@Module({
  controllers: [NotificationController],
  providers: [
    amqpProvider,
    QueueOutpatientRepository,
    PatientRepository,
    DoctorRepository,
    QueueNotificationMapper,
    {
      provide: QueueOutpatientListUsecase,
      useFactory: (
        queueOutpatientRepository: QueueOutpatientRepository,
        patientRepository: PatientRepository,
        doctorRepository: DoctorRepository,
        queueNotificationMapper: QueueNotificationMapper,
      ) =>
        new QueueOutpatientListUsecase(
          queueOutpatientRepository,
          patientRepository,
          doctorRepository,
          queueNotificationMapper,
        ),
      inject: [
        QueueOutpatientRepository,
        PatientRepository,
        DoctorRepository,
        QueueNotificationMapper,
      ],
    },
  ],
  exports: [amqpProvider],
})
export class NotificationModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('notifications');
  }
}
