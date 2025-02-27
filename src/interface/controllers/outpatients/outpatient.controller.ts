import { Body, Controller, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { CreateOutpatientDto } from "src/core/domain/interfaces/dtos/outpatients/create-outpatient.dto";
import { OutpatientStatus, VerificationStatus } from "src/core/domain/interfaces/types/enum.type";
import { CreateOutpatietUsecase } from "src/use-cases/outpatient/create-outpatient.use-case";
import { FetchOutpatientsWithoutFilterUsecase } from "src/use-cases/outpatient/fetch-outpatients.use-case";
import { UpdateVerificationStatusUsecase } from "src/use-cases/outpatient/update-verification.use-case";

export interface QueryOutpatient {
    status: string | null;
    doctor_id: string | null;
    keyword: string | null;
    consult_date: string | null;
}

@Controller('outpatients')
export class OutpatientController {
    constructor(
        public createOutpatietUsecase: CreateOutpatietUsecase,
        public updateVerificationStatusUsecase: UpdateVerificationStatusUsecase,
        public fetchOutpatientsWithoutFilterUsecase: FetchOutpatientsWithoutFilterUsecase,
    ) {}

    @Post()
    async createNewOutpatient(@Body() createOutpatientDto: CreateOutpatientDto) {
        await this.createOutpatietUsecase.execute(createOutpatientDto);
    }

    @Patch(":outpatient_id")
    async updateOutpatient(@Param('outpatient_id') outpatientId: string, @Body() data: { finished_status?: OutpatientStatus, verify_status?: boolean }) {
        await this.updateVerificationStatusUsecase.execute(outpatientId, data.verify_status, data.finished_status);
    }

    @Get()
    async getAllOutpatients() {
        return await this.fetchOutpatientsWithoutFilterUsecase.execute()
    }

    // @Get()
    // async filterOutpatientByVerification(@Query() queryOutpatient: QueryOutpatient) {

    // }

    // @Get()
    // async filterOutpatientByDoneStatus(@Query() status: { finished: boolean }) {

    // }
}