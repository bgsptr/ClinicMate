import { PatientEntity } from "src/core/domain/entities/patient.entity";
import { CustomNotFoundError } from "src/core/domain/errors/not-found.error";
import { PatientRepository } from "src/infrastructure/repositories/patient.repository";
import { UserRepository } from "src/infrastructure/repositories/user.repository";

export class SelfInformationPatientUsecase {
    constructor(
        private readonly patientRepository: PatientRepository,
    ) {}

    async execute(email: string): Promise<PatientEntity> {
        try {
            const data = await this.patientRepository.show(email);

            return data;
        } catch(err) {
            throw new CustomNotFoundError(`cannot find patient`);
        }
    }
}