export class ListPatientDto {
    constructor(
        public patient_name: string,
        public medical_number: string,
        public birth_date: string,
        public category: string,
        public status: boolean
    ) {}
}