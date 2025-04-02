import { CoreUserInformationDto, Gender } from "../users/core-user-information.dto";

export class OutpatientRegistrationDto extends CoreUserInformationDto {
    constructor(
        full_name: string,
        birth_place: string,
        birth_date: string,
        gender: Gender,
        domicile: string,
        phone_number: string,
        public email: string,
        public doctor_id: string,
        public consultation_date: Date,
        public consultation_hour: string,
        public medical_number?: string
    ) {
        super(
            full_name,
            birth_place,
            birth_date,
            gender,
            domicile,
            phone_number
        );
    }
}