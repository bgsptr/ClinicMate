import { Module } from '@nestjs/common';
import { AppController } from './interface/controllers/app.controller';
import { AppService } from './interface/controllers/app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
