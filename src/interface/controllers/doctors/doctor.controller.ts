import {
  Body,
  ConflictException,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Res,
  UseFilters,
  UsePipes,
} from '@nestjs/common';
import { Response } from 'express';
import { FindEmail } from 'src/core/domain/decorators/get-user-email.decorator';
import { CustomConflictError } from 'src/core/domain/errors/conflict.error';
import { ZodFilter } from 'src/core/domain/errors/exception-filters/zod.filter';
import { AssignDoctorDto } from 'src/core/domain/interfaces/dtos/admins/assign-doctor.dto';
import { ApiResponse } from 'src/core/domain/interfaces/dtos/responses/api-response';
import { ZodValidationPipe } from 'src/core/domain/pipes/zod-validation.pipe';
import { doctorSchema } from 'src/schemas/doctor.schema';
import { CreateDoctorUsecase } from 'src/use-cases/doctors/create-doctor.use-case';
import { FindDoctorUsecase } from 'src/use-cases/doctors/find-doctor.use-case';
import { FetchAvailableQueueUsecase } from 'src/use-cases/doctors/queue/fetch-available-queue.use-case';
import { ShowAllDoctorUsecase } from 'src/use-cases/doctors/show-all-doctor.use-case';
import { UpdateDoctorUsecase } from 'src/use-cases/doctors/update-doctor.use-case';

@Controller('doctors')
export class DoctorController {
  constructor(
    public createDoctorUsecase: CreateDoctorUsecase,
    public findDoctorUsecase: FindDoctorUsecase,
    public updateDoctorUsecase: UpdateDoctorUsecase,
    public showAllDoctorUsecase: ShowAllDoctorUsecase,
    public fetchAvailableQueueUsecase: FetchAvailableQueueUsecase,
  ) {}

  @Get()
  async fetchAllDoctors() {
    return await this.showAllDoctorUsecase.execute();
  }

  @Get(':doctor_id')
  async getDoctorId(@Param() params: { doctor_id: string }) {
    const { doctor_id } = params;
    try {
      return await this.findDoctorUsecase.execute(doctor_id);
    } catch (error) {
      const data = JSON.parse(error?.message);
      // console.log(data)
      throw new HttpException(
        {
          error: true,
          message: data?.message,
        },
        data?.statusCode,
        {
          cause: error,
        },
      );
    }
  }

  @Patch(':doctor_id')
  async changeDoctorData(
    @Body() updateDoctorDto: AssignDoctorDto,
    @Param() params: { doctor_id?: string | number },
    @FindEmail() email: string,
  ) {
    console.log(updateDoctorDto);

    if (updateDoctorDto?.email) {
      throw new HttpException(
        {
          error: true,
          message: `can't update email via body`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      return await this.updateDoctorUsecase.execute(
        updateDoctorDto,
        params.doctor_id,
        email,
      );
    } catch (error) {
      const data = JSON.parse(error?.message);
      console.log(data);
      throw new HttpException(
        {
          error: true,
          message: data?.message,
        },
        data?.statusCode,
        {
          cause: error,
        },
      );
    }
  }

  @Post()
  @UseFilters(new ZodFilter())
  @UsePipes(new ZodValidationPipe(doctorSchema))
  async assignNewDoctor(
    @Res() res: Response,
    @Body() assignDoctorDto: AssignDoctorDto,
  ) {
    console.log(assignDoctorDto);

    try {
      const doctorDto = await this.createDoctorUsecase.execute(assignDoctorDto);
      const response = new ApiResponse(
        res,
        201,
        'success create new doctor',
        doctorDto,
      );

      return response.send();
    } catch (error) {
      if (error instanceof CustomConflictError)
        throw new ConflictException(error?.message);
      const data = JSON.parse(error?.message);
      console.log(data);
      throw new HttpException(
        {
          error: true,
          message: data?.message,
        },
        data?.statusCode,
        {
          cause: error,
        },
      );
    }
  }

  @Get(':doctor_id/schedules')
  async fetchAvailableQueueByDoctorId(
    @Param() params: { doctor_id: string },
    @Query() queries: { consult_date: string },
  ) {
    const { doctor_id } = params;
    const { consult_date } = queries;
    console.log('doctor-id', doctor_id);
    console.log('consult_date', consult_date);
    return await this.fetchAvailableQueueUsecase.execute(
      doctor_id,
      consult_date,
    );
  }
}
