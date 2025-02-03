import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { FindEmail } from "src/core/domain/decorators/get-user-email.decorator";
import { Roles } from "src/core/domain/decorators/roles.decorator";
import { RolesGuard } from "src/core/domain/guards/role.guard";
import { CoreUserInformationDto } from "src/core/domain/interfaces/dtos/users/core-user-information.dto";
import { CreatePatientInformationUsecase } from "src/use-cases/patients/create-information/create-information.use-case";
import { ShowInformationUsecase } from "src/use-cases/patients/show-information/show-information.use-case";

@Controller('patient')
export class PatientController {
    constructor(
        private createInformationUsecase: CreatePatientInformationUsecase,
        private fetchInformationUsecase: ShowInformationUsecase
    ) {}

    @Roles(['patient', 'admin'])
    @UseGuards(RolesGuard)
    @Get()
    async findPatientData(@FindEmail() email: string) {
        return await this.fetchInformationUsecase.execute(email);
    }

    @Roles(['patient', 'admin'])
    @UseGuards(RolesGuard)
    @Post()
    async updateData(@FindEmail() email: string, @Body() updateData: CoreUserInformationDto) {
        return await this.createInformationUsecase.execute(updateData, email);
    }
}