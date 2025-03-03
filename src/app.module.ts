import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './interface/controllers/users/user.module';
import { PatientModule } from './interface/controllers/patients/patient.module';
import { DoctorModule } from './interface/controllers/doctors/doctor.module';
import { ScheduleModule } from './interface/controllers/schedules/schedule.module';
import { OutpatientModule } from './interface/controllers/outpatients/outpatient.module';
import { ChatbotModule } from './interface/websockets/chatbots/chatbot.module';

@Module({
  imports: [
    UserModule,
    PatientModule,
    DoctorModule,
    ScheduleModule,
    OutpatientModule,
    ChatbotModule,
    ConfigModule.forRoot()],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
