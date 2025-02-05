import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './interface/controllers/users/user.module';
import { PatientModule } from './interface/controllers/patients/patient.module';

@Module({
  imports: [
    UserModule,
    PatientModule,
    ConfigModule.forRoot()],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
