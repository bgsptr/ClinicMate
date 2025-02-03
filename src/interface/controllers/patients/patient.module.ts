import { Module } from "@nestjs/common";
import { PatientController } from "./patient.controller";

@Module({
    controllers: [PatientController],
    providers: [
        
    ]
})

export class PatientModule {}