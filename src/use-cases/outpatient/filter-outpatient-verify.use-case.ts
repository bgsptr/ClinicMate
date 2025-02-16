import { OutpatientRepository } from "src/infrastructure/repositories/outpatient.repository";

export class FilterOutpatientVerifyUsecase {
    constructor(
        private readonly outpatientRepository: OutpatientRepository
    ) {}

    async execute() {
        // await this.outpatientRepository.filterByVerificationStatus();
    }
}