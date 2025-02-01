import { Module } from '@nestjs/common';
import { AppController } from './interface/controllers/app.controller';
import { AppService } from './interface/controllers/app.service';
import { UserModule } from './interface/controllers/users/user.module';

@Module({
  imports: [UserModule],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
