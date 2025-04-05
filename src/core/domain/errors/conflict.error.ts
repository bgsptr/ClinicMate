import { CustomHTTPError } from "./custom-http.error";

export class CustomConflictError extends CustomHTTPError {
    constructor(message: string) {
        super(message, "CONFLICT")
    }
}