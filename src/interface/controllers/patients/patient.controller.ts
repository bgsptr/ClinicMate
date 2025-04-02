import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { FindEmail } from "src/core/domain/decorators/get-user-email.decorator";
import { FetchRoles } from "src/core/domain/decorators/roles.decorator";
import { CoreUserInformationDto, Role } from "src/core/domain/interfaces/dtos/users/core-user-information.dto";
import { RegisterDto } from "src/core/domain/interfaces/dtos/users/register.dto";
import { CreatePatientInformationUsecase } from "src/use-cases/patients/create-information/create-information.use-case";
import { FetchAllPatientUsecase } from "src/use-cases/patients/fetch-all-patient.use-case";
import { ShowInformationUsecase } from "src/use-cases/patients/show-information/show-information.use-case";
import { Register } from "src/use-cases/users/register/register.use-case";

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
        private fetchAllPatientUsecase : FetchAllPatientUsecase,
        private registerUsecase : Register
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
    async updateData(@FindEmail() email: string, @FetchRoles() roles: Role, @Body() bodyData: CoreUserInformationDto) {
        console.log(email);
        console.log("current user role: ", roles);
        console.log("inserted email: ", bodyData.email);
        if (bodyData.email && roles === Role.ADMIN) {
            const registerDto: RegisterDto = new RegisterDto(bodyData.email, "");
            await this.registerUsecase.execute(registerDto);
            console.log("admin create patient");
            return await this.createInformationUsecase.execute(bodyData, bodyData.email);
        }

        console.log("patient update data");
        return await this.createInformationUsecase.execute(bodyData, email);
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