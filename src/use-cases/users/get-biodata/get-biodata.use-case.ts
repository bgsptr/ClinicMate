import { Role } from "src/core/domain/interfaces/dtos/users/core-user-information.dto";
import { PatientRepository } from "src/infrastructure/repositories/patient.repository";
import { UserRepository } from "src/infrastructure/repositories/user.repository";

export class GetBiodata {
    constructor(
        private userRepository: UserRepository,
        private patientRepository: PatientRepository
    ) {}

    execute = async (emailReq: string) => {
        const { email, role } = await this.userRepository.findByEmail(emailReq);
        const patientData = await this.patientRepository.showWithoutCatchError(emailReq);

        if (role !== Role.PATIENT) return;

        return {
            email,
            role,
            name: patientData?.name || null,
            id_patient: patientData?.id_patient || null,
            birth_date: patientData?.birth_date || null,
            gender: patientData?.gender || null,
            address: patientData?.address || null,
            phone_number: patientData?.phone_number || null
        }
    }
}