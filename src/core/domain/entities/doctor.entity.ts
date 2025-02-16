export class DoctorEntity {
    constructor(
        public id_doctor: string,
        public name: string,
        public address: string,
        public phone_number: string,
        public email: string,
        public url_profile?: string | null
    ) {}
}