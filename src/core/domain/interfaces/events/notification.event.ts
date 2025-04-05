export class NotificationEvent {
    constructor(
        public subject: string,
        public email: string,
        public delay: number,
    ) {

    }
}