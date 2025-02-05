export const Role: {
    ADMIN: 'ADMIN'
    PATIENT: 'PATIENT'
    DOCTOR: 'DOCTOR'
} = {
    ADMIN: 'ADMIN',
    PATIENT: 'PATIENT',
    DOCTOR: 'DOCTOR'
}

export type Role = typeof Role[keyof typeof Role]

export const Gender: {
    MALE: 'MALE'
    FEMALE: 'FEMALE'
} = {
    MALE: 'MALE',
    FEMALE: 'FEMALE',
}

export type Gender = typeof Gender[keyof typeof Gender]

export class CoreUserInformationDto {
    constructor(
        public full_name: string,
        public birth_place: string,
        public birth_date: string,
        public gender: Gender,
        public domicile: string,
    ) {}
}
