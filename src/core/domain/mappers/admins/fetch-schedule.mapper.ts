import { ResponseDto } from "../../interfaces/dtos/users/response.dto";
import { IMapper } from "../../interfaces/providers/mapper.provider.interface";

export class FetchScheduleMapper implements IMapper<void, void, ResponseDto> {
    mapFromDto(input: void, ...args: any): void {
        
    }

    mapFromEntity(output: void, ...args: any): void {
        
    }

    mapToResponseJson(message: string, result?: any, isError?: boolean, statusCode?: number): ResponseDto {
        return new ResponseDto(
            false,
            200,
            message,
            result
        )
    }
}