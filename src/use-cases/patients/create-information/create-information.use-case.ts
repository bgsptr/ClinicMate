import { CoreUserInformationDto } from "src/core/domain/interfaces/dtos/users/core-user-information.dto";
import { CorePatientMapper } from "src/core/domain/mappers/users/core-patient.mapper";
import { PatientRepository } from "src/infrastructure/repositories/patient.repository";

export class CreatePatientInformationUsecase {
    constructor(
        public patientRepository: PatientRepository,
        public corePatientMapper: CorePatientMapper
    ) {}

    async execute(data: CoreUserInformationDto, email: string) {
        const birthArray = data.birth_date.split('-');
        const dateArr: number[] = [];
        for (let val in birthArray) {
            dateArr.push(Number(val));
        }
        const updatedDate = new Date(dateArr[0], dateArr[1] - 1, dateArr[0]);
        const convertedBirthDate = updatedDate;
        const patientData = this.corePatientMapper.mapFromDto(data, email, convertedBirthDate);
        await this.patientRepository.create(patientData);
        // this.corePatientMapper.mapFromEntity()
        return patientData
    }
}