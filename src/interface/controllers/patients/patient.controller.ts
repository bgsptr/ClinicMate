import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { FindEmail } from "src/core/domain/decorators/get-user-email.decorator";
import { Roles } from "src/core/domain/decorators/roles.decorator";
import { RolesGuard } from "src/core/domain/guards/role.guard";
import { CoreUserInformationDto } from "src/core/domain/interfaces/dtos/users/core-user-information.dto";
import { CreatePatientInformationUsecase } from "src/use-cases/patients/create-information/create-information.use-case";
import { FetchAllPatientUsecase } from "src/use-cases/patients/fetch-all-patient.use-case";
import { ShowInformationUsecase } from "src/use-cases/patients/show-information/show-information.use-case";

export interface QueryPatientDto {
    index: number | null;
    keyword: string | null;
    date: string | null;
}

@Controller('patients')
export class PatientController {
    constructor(
        private createInformationUsecase: CreatePatientInformationUsecase,
        private showInformationUsecase: ShowInformationUsecase,
        private fetchAllPatientUsecase : FetchAllPatientUsecase
    ) {}

    // @Roles(['patient', 'admin'])
    // @UseGuards(RolesGuard)
    // @Get()
    // async findPatientData(@FindEmail() email: string) {
    //     return await this.showInformationUsecase.execute(email);
    // }

    // @Roles(['patient', 'admin'])
    // @UseGuards(RolesGuard)
    @Post()
    async updateData(@FindEmail() email: string, @Body() updateData: CoreUserInformationDto) {
        console.log(email);
        return await this.createInformationUsecase.execute(updateData, email);
    }

    // @Get()
    // async findAllPatients() {
    //     return await this.fetchAllPatientUsecase.execute()
    // }

    @Get()
    async findAllPatients(@Query() query: QueryPatientDto) {
        // const { index, keyword, date } = query;

        return await this.fetchAllPatientUsecase.execute(query);
    }
}