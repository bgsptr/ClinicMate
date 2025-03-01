import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { FindEmail } from "src/core/domain/decorators/get-user-email.decorator";
import { FetchRoles } from "src/core/domain/decorators/roles.decorator";
import { CreateScheduleDto } from "src/core/domain/interfaces/dtos/doctors/create-schedule.dto";
import { Role } from "src/core/domain/interfaces/dtos/users/core-user-information.dto";
import { CreateScheduleUsecase } from "src/use-cases/admins/create-schedule.use-case";
import { DeleteScheduleUsecase } from "src/use-cases/admins/delete-schedule.use-case";
import { UpdateScheduleUsecase } from "src/use-cases/admins/update-schedule.use-case";
import { MasterScheduleAccessUsecase } from "src/use-cases/schedules/master-schedule-access.use-case";
import { ScheduleDoctorIdUseCase } from "src/use-cases/schedules/schedule-doctorid.use-case";

@Controller('schedule')
export class ScheduleControler {
    constructor(
        private createScheduleUsecase: CreateScheduleUsecase,
        private deleteScheduleUsecase: DeleteScheduleUsecase,
        private updateScheduleUsecase: UpdateScheduleUsecase,
        private masterScheduleAccessUsecase : MasterScheduleAccessUsecase,
        private scheduleDoctorIdUseCase : ScheduleDoctorIdUseCase
    ) {}

    @Post()
    async createNewSchedule(@Body() createScheduleDto: CreateScheduleDto) {
        return await this.createScheduleUsecase.execute(createScheduleDto);
    }

    @Delete(':schedule_id')
    async deleteScheduleWithScheduleId(@Param() schedule_id: string) {
        return await this.deleteScheduleUsecase.execute(schedule_id);
    }

    @Put(':schedule_id')
    async updateScheduleWithScheduleId(@Param() schedule_id: string, @Body() create_schedule_dto: CreateScheduleDto) {
        return await this.updateScheduleUsecase.execute(create_schedule_dto, schedule_id);
    }

    @Get('doctor/:doctor_id')
    async findAllScheduleFromEachDoctor(@Param() params: { doctor_id: string }, @FindEmail() email: string, @FetchRoles() role: Role) {
        console.log(email)
        return await this.scheduleDoctorIdUseCase.execute(params.doctor_id, email, role);
    }

    @Get()
    async fetchAllDoctorsSchedule(@Query() query: { doctor_id: string }) {
        const { doctor_id } = query;
        return await this.masterScheduleAccessUsecase.execute(doctor_id);
    }
}