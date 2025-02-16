import { CreateDoctorMapper } from "src/core/domain/mappers/doctors/create-doctor.mapper";
import { DoctorRepository } from "src/infrastructure/repositories/doctor.repository";

export class ShowAllDoctorUsecase {
    constructor(
        public readonly doctorRepository: DoctorRepository,
        public createDoctorMapper : CreateDoctorMapper
    ) {}

    async execute() {
        const doctors = await this.doctorRepository.findAllDoctor();
        return this.createDoctorMapper.mapToResponseJson(
            false,
            200,
            "successfully fetch all doctors",
            doctors
        )
    }
}