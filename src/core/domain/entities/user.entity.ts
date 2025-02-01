enum Gender {
    male,
    Female
}

export class UserEntity {
    constructor(
        public readonly email: string,
        public password: string,
        public name?: string,
        public gender?: Gender,
        public birth_place?: string,
        public birth_date?: string,
        public address?: string
    ) {}
}