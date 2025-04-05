import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { CustomNotFoundError } from "src/core/domain/errors/not-found.error";
import { PatientRepository } from "src/infrastructure/repositories/patient.repository";

export class FetchOnlyPatientUsecase {
    constructor(
        private patientRepository: PatientRepository
    ) {}

    async execute(patientId: string): Promise<string> {
        try {
            return await this.patientRepository.findEmailByPatientId(patientId);
        } catch(err) {
            if (err instanceof PrismaClientKnownRequestError) {
                throw new CustomNotFoundError(`cannot find patient with id ${patientId}`)
            }
            throw err;
        }
        
    }
}