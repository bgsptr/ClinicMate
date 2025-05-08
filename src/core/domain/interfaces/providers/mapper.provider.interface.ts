export interface IMapper<Input, Output, Response> {
    mapFromDto?(input: Input, ...args: any): Output;
    mapFromEntity?(output: Output, ...args: any): Input;
    mapToResponseJson?(...args: any): Response;
    mapToDto?(...args: any): Input;
}