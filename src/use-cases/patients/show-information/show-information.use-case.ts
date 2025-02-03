import { CorePatientMapper } from "src/core/domain/mappers/users/core-patient.mapper";
import { PatientRepository } from "src/infrastructure/repositories/patient.repository";

export class ShowInformationUsecase {
    constructor(
        private patientRepository: PatientRepository,
        private corePatientMapper: CorePatientMapper
    ) {}

    async execute(email: string) {
        const patientFromDb = await this.patientRepository.show(email);
        if (!patientFromDb) throw new Error(`patient with email ${email} is not found`);

        const { name, id_patient, birth_date, gender, address, phone_number } = patientFromDb;
        const dateConverted = new Date(birth_date);
        const stringDateTime = dateConverted.toString();
        const dateString = stringDateTime.split('T')[0];
        return this.corePatientMapper.mapFromEntity(patientFromDb, dateString);
    }
}