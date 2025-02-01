import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { FindEmail } from "src/core/decorators/get-user-email.decorator";
import { RegisterDto } from "src/core/domain/interfaces/dtos/users/register.dto";
import { GetBiodata } from "src/use-cases/users/get-biodata/get-biodata.use-case";
import { Register } from "src/use-cases/users/register/register.use-case";

@Controller('users')
export class UserController {
    constructor(
        // private readonly getBiodataUseCase: GetBiodata,
        private readonly register: Register
    ) {}

    // @Get('findMe')
    // findMyInformation(@FindEmail() email: string) {
    //     return this.getBiodataUseCase.execute(email);
    // }

    @Post('register')
    registerAccount(@Body() registerDto: RegisterDto) {
        return this.register.execute(registerDto);
    }

    // @Post('login')
    // loginAccount(@Body() loginDto: LoginDto) {
    //     return this.login.execute();
    // }
}