export class ResponseDto {
    constructor(
        public error: boolean,
        public message: string,
        public status?: number
    ) {}
}