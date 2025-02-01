export interface IMapper<Input, Output> {
    mapFromDto?(input: Input): Output;
    mapToEntity?(output: Output): Input;
}