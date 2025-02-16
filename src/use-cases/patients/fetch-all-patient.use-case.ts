import { CorePatientMapper } from "src/core/domain/mappers/users/core-patient.mapper";
import { PatientRepository } from "src/infrastructure/repositories/patient.repository";
import { QueryPatientDto } from "src/interface/controllers/patients/patient.controller";

export class FetchAllPatientUsecase {
    constructor(
        public patientRepository: PatientRepository,
        public corePatientMapper: CorePatientMapper
    ) {}

    async execute(query: QueryPatientDto) {
        const { index, keyword, date } = query;
        
        const patients = await this.patientRepository.showAll(index || 0);

        // const patientDto: CoreUserInformationDto
        patients.map((val, idx) => {
            this.corePatientMapper.mapFromEntity(val, val.birth_date.toDateString());
            // patients[idx].birth_date = val.birth_date.toDateString();
        })

        if (date) {

        }

        return patients;
    }
}