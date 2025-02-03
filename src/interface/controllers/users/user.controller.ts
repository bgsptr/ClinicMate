import { Body, Controller, Get, Post, Put, Req, UseGuards } from "@nestjs/common";
import { FindEmail } from "src/core/domain/decorators/get-user-email.decorator";
import { Roles } from "src/core/domain/decorators/roles.decorator";
import { CoreUserInformationDto } from "src/core/domain/interfaces/dtos/users/core-user-information.dto";
import { LoginDto } from "src/core/domain/interfaces/dtos/users/login.dto";
import { RegisterDto } from "src/core/domain/interfaces/dtos/users/register.dto";
import { RolesGuard } from "src/core/domain/guards/role.guard";
import { GetBiodata } from "src/use-cases/users/get-biodata/get-biodata.use-case";
import { Login } from "src/use-cases/users/login/login.use-case";
import { Register } from "src/use-cases/users/register/register.use-case";
import { UpdateAccount } from "src/use-cases/users/update-account/update-account.use-case";

@Controller('users')
export class UserController {
    constructor(
        private readonly getBiodataUseCase: GetBiodata,
        private readonly register: Register,
        private readonly login: Login,
        private readonly updateAccount: UpdateAccount,
    ) {}

    // @Roles(['patient, admin, doctor'])
    @Get('findMe')
    findMyInformation(@FindEmail() email: string) {
        return this.getBiodataUseCase.execute(email);
    }

    @Post('register')
    registerAccount(@Body() registerDto: RegisterDto) {
        return this.register.execute(registerDto);
    }

    @Post('login')
    loginAccount(@Body() loginDto: LoginDto) {
        return this.login.execute(loginDto);
    }

    // @Put('/')
    // updateProfile(@Body() userDto: CoreUserInformationDto) {
    //     return this.updateAccount.execute(email, userDto)
    // }
}