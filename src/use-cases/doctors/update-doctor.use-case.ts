import { AssignDoctorDto } from "src/core/domain/interfaces/dtos/admins/assign-doctor.dto";
import { CreateDoctorMapper } from "src/core/domain/mappers/doctors/create-doctor.mapper";
import { DoctorRepository } from "src/infrastructure/repositories/doctor.repository";

export class UpdateDoctorUsecase {
    constructor(
        public doctorRepository: DoctorRepository,
        public createDoctorMapper: CreateDoctorMapper
    ) {}

    async execute(updateDoctorDto: AssignDoctorDto, doctorId?: string | number, email?: string) {
        const doctorEntity = this.createDoctorMapper.mapFromDto(updateDoctorDto);
        
        const doctorResult = doctorId
        ? await this.doctorRepository.updateAndGetDataWithId(doctorId, doctorEntity).catch(err => {
            console.log(err);
            const data = {
                statusCode: 404,
                message: `can't find doctor with id ${doctorId}`
            }
            throw new Error(JSON.stringify(data));
        })
        : email ? await this.doctorRepository.updateAndGetDataWithEmail(email, doctorEntity) : null;

        if (!doctorResult) {
            // validate
            const data = {
                statusCode: 400,
                message: `can't update doctor with ${email ? "email " + email : "id " + doctorId}`
            }
            throw new Error(JSON.stringify(data));
        }

        return this.createDoctorMapper.mapToResponseJson(
            false,
            200,
            `update data with ${email ? "email " + email : "id " + doctorId}`,
            doctorResult
        )
    }
}