import { CoreUserInformationDto } from "src/core/domain/interfaces/dtos/users/core-user-information.dto";
import { CorePatientMapper } from "src/core/domain/mappers/users/core-patient.mapper";
import { PatientRepository } from "src/infrastructure/repositories/patient.repository";
import { v1 as uuidv1 } from "uuid";

export class CreatePatientInformationUsecase {
    constructor(
        public patientRepository: PatientRepository,
        public corePatientMapper: CorePatientMapper
    ) {}

    async execute(data: CoreUserInformationDto, email: string) {
        const [year, month, date] = data.birth_date.split('-').map(Number);
        const dateArr: number[] = [];

        const updatedDate = new Date(year, month - 1, date + 1, 0, 0, 0);
        const convertedBirthDate = updatedDate;
        const patientData = this.corePatientMapper.mapFromDto(data, email, convertedBirthDate, uuidv1());
        await this.patientRepository.create(patientData);
        // this.corePatientMapper.mapFromEntity()
        return patientData
    }
}