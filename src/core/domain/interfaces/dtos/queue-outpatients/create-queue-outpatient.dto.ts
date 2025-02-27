export class CreateQueueOutpatientDto {
    constructor(
        public outpatientId: string,
        public queueOutpatientNo: number,
        public outpatientDate: string
    ) {}
}