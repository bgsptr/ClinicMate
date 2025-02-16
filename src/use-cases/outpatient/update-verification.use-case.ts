import { OutpatientRepository } from "src/infrastructure/repositories/outpatient.repository";

export class UpdateVerificationStatusUsecase {
    constructor(
        private readonly outpatientRepository : OutpatientRepository
    ) {}

    async execute(outpatientId: string) {
        // await this.outpatientRepository.updateVerificationStatus(outpatientId);
    }
}