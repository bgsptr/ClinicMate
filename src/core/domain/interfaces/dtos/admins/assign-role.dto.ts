import { CoreUserInformationDto, Gender } from "../users/core-user-information.dto";

export enum Role {
    admin = "ADMIN",
    patient = "PATIENT",
    doctor = "DOCTOR"
}

export class AssignRoleDto extends CoreUserInformationDto {
    constructor(
        full_name: string,
        birth_place: string,
        birth_date: string,
        gender: Gender,
        domicile: string,
        phone_number: string,
        public role: Role
    ) {
        super(
            full_name,
            birth_place,
            birth_date,
            gender,
            domicile,
            phone_number
        )
    }
}
