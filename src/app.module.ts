import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './interface/controllers/users/user.module';
import { PatientModule } from './interface/controllers/patients/patient.module';
import { DoctorModule } from './interface/controllers/doctors/doctor.module';
import { ScheduleModule } from './interface/controllers/schedules/schedule.module';
import { OutpatientModule } from './interface/controllers/outpatients/outpatient.module';
import { ChatbotModule } from './interface/websockets/chatbots/chatbot.module';
import { amqpProvider } from './provider/amqp.provider';
import { NotificationModule } from './interface/controllers/notifications/notification.module';

@Module({
  imports: [
    UserModule,
    PatientModule,
    DoctorModule,
    ScheduleModule,
    OutpatientModule,
    ChatbotModule,
    NotificationModule,
    ConfigModule.forRoot()],
  // controllers: [AppController],
  providers: [amqpProvider],
  exports: [amqpProvider],
})
export class AppModule {}
