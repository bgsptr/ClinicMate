import { Gender } from "../interfaces/dtos/users/core-user-information.dto";

export class PatientEntity {
    constructor(
        public name: string,
        public email: string,
        public id_patient: string,
        public birth_date: Date,
        public gender: Gender,
        public address: string,
        public phone_number?: string
    ) {}
}