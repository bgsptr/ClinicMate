import { AssignDoctorDto } from "src/core/domain/interfaces/dtos/admins/assign-doctor.dto";
import { Role } from "src/core/domain/interfaces/dtos/users/core-user-information.dto";
import { CreateDoctorMapper } from "src/core/domain/mappers/doctors/create-doctor.mapper";
import { DoctorRepository } from "src/infrastructure/repositories/doctor.repository";
import { UserRepository } from "src/infrastructure/repositories/user.repository";
import { v4 as uuidv4 } from "uuid";

export class CreateDoctorUsecase {
    constructor(
        public doctorRepository: DoctorRepository,
        public userRepository: UserRepository,
        public createDoctorMapper : CreateDoctorMapper
    ) {}

    async execute(doctorDto: AssignDoctorDto) {
        const stringId = uuidv4();

        try {
            const doctor = await this.doctorRepository.findDoctorByEmail(String(doctorDto?.email));

            if (doctor) return this.createDoctorMapper.mapToResponseJson(
                true,
                401,
                "failed assign new doctor",
            );

            const doctorEntityData = this.createDoctorMapper.mapFromDto(doctorDto, stringId);

            await this.doctorRepository.create(doctorEntityData);

            await this.userRepository.updateRoleByEmail(doctorEntityData?.email, Role.DOCTOR);

            return this.createDoctorMapper.mapToResponseJson(
                false,
                200,
                "Successfully assign new doctor",
                doctorEntityData
            );

        } catch (error) {
            console.log(error);
            const data = {
                statusCode: 400,
                message: `${error?.message}`
            }
            throw new Error(JSON.stringify(data));
        }
 


        

    }
}