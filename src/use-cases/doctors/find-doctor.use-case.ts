import { AssignDoctorDto } from "src/core/domain/interfaces/dtos/admins/assign-doctor.dto";
import { CreateDoctorMapper } from "src/core/domain/mappers/doctors/create-doctor.mapper";
import { DoctorRepository } from "src/infrastructure/repositories/doctor.repository";

export class FindDoctorUsecase {
    constructor(
        public doctorRepository: DoctorRepository,
        public createDoctorMapper : CreateDoctorMapper
    ) {}

    async execute(doctorId: string) {
        // const doctorEntity = this.createDoctorMapper.mapFromDto(doctorDto);

        try {
            const { email, ...doctor } = await this.doctorRepository.findDoctorById(doctorId);

            return this.createDoctorMapper.mapToResponseJson(
                false,
                200,
                `Successfully get data doctor with id ${doctor?.id_doctor}`,
                doctor
            )
            
        } catch (error) {
            // console.log(error);
            const data = {
                statusCode: 404,
                message: `can't find doctor with id: ${doctorId}`
            }
            throw new Error(JSON.stringify(data));
        }

    }
}