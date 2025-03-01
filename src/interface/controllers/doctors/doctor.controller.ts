import { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Post, Put, Query } from "@nestjs/common";
import { FindEmail } from "src/core/domain/decorators/get-user-email.decorator";
import { AssignDoctorDto } from "src/core/domain/interfaces/dtos/admins/assign-doctor.dto";
import { CreateDoctorUsecase } from "src/use-cases/doctors/create-doctor.use-case";
import { FindDoctorUsecase } from "src/use-cases/doctors/find-doctor.use-case";
import { FetchAvailableQueueUsecase } from "src/use-cases/doctors/queue/fetch-available-queue.use-case";
import { ShowAllDoctorUsecase } from "src/use-cases/doctors/show-all-doctor.use-case";
import { UpdateDoctorUsecase } from "src/use-cases/doctors/update-doctor.use-case";

@Controller('doctors')
export class DoctorController {
    constructor(
        public createDoctorUsecase : CreateDoctorUsecase,
        public findDoctorUsecase : FindDoctorUsecase,
        public updateDoctorUsecase : UpdateDoctorUsecase,
        public showAllDoctorUsecase: ShowAllDoctorUsecase,
        public fetchAvailableQueueUsecase: FetchAvailableQueueUsecase
    ) {}

    @Get()
    async fetchAllDoctors() {
        return await this.showAllDoctorUsecase.execute();
    }

    @Get(":doctor_id")
    async getDoctorId(@Param() params: { doctor_id: string }) {
        const { doctor_id } = params;
        try {
            return await this.findDoctorUsecase.execute(doctor_id);
        } catch (error) {
            const data = JSON.parse(error?.message);
            // console.log(data)
            throw new HttpException({
                error: true,
                message: data?.message
            }, data?.statusCode, {
                cause: error
            })
        }
    }

    @Patch(":doctor_id")
    async changeDoctorData(@Body() updateDoctorDto: AssignDoctorDto, @Param() params: { doctor_id?: string | number }, @FindEmail() email: string) {
        console.log(updateDoctorDto);

        if (updateDoctorDto?.email) {
            throw new HttpException({
                error: true,
                message: `can't update email via body`
            }, HttpStatus.BAD_REQUEST)
        }

        try {
            return await this.updateDoctorUsecase.execute(updateDoctorDto, params.doctor_id, email);
        } catch (error) {
            const data = JSON.parse(error?.message);
            console.log(data)
            throw new HttpException({
                error: true,
                message: data?.message
            }, data?.statusCode, {
                cause: error
            })
        }
    }

    @Post()
    async assignNewDoctor(@Body() assignDoctorDto: AssignDoctorDto) {
        console.log(assignDoctorDto);

        try {
            return await this.createDoctorUsecase.execute(assignDoctorDto);
        } catch (error) {
            const data = JSON.parse(error?.message);
            console.log(data)
            throw new HttpException({
                error: true,
                message: data?.message
            }, data?.statusCode, {
                cause: error
            })
        }
    }

    @Get(":doctor_id/schedules")
    async fetchAvailableQueueByDoctorId(@Param() params: { doctor_id: string }, @Query() queries: { consult_date: string }) {
        const { doctor_id } = params;
        const { consult_date } = queries;
        return await this.fetchAvailableQueueUsecase.execute(doctor_id, consult_date);
    }
}