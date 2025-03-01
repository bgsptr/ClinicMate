import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { FindEmail } from "src/core/domain/decorators/get-user-email.decorator";
import { FetchRoles } from "src/core/domain/decorators/roles.decorator";
import { CoreUserInformationDto } from "src/core/domain/interfaces/dtos/users/core-user-information.dto";
import { LoginDto } from "src/core/domain/interfaces/dtos/users/login.dto";
import { RegisterDto } from "src/core/domain/interfaces/dtos/users/register.dto";
import { RolesGuard } from "src/core/domain/guards/role.guard";
import { GetBiodata } from "src/use-cases/users/get-biodata/get-biodata.use-case";
import { Login } from "src/use-cases/users/login/login.use-case";
import { Register } from "src/use-cases/users/register/register.use-case";
import { UpdateRoleOrDataUserUsecase } from "src/use-cases/users/change-data/change-data.use-case";
import { Response } from "express";
// import { UpdateAccount } from "src/use-cases/users/update-account/update-account.use-case";

@Controller('users')
export class UserController {
    constructor(
        private readonly getBiodataUseCase: GetBiodata,
        private readonly register: Register,
        private readonly login: Login,
        // private readonly updateRoleOrDataUserUsecase: UpdateRoleOrDataUserUsecase,
    ) {}

    // @Roles(['patient, admin, doctor'])
    @Get('me')
    findMyInformation(@FindEmail() email: string) {
        console.log("email me", email);
        return this.getBiodataUseCase.execute(email);
    }

    @Post('register')
    registerAccount(@Body() registerDto: RegisterDto) {
        return this.register.execute(registerDto);
    }

    @Post('login')
    async loginAccount(@Body() loginDto: LoginDto, @Res() res: Response) {
        try {
            const result = await this.login.execute(loginDto);

            res.cookie('token', result.result?.token, {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
            });

            return res.status(200).json({
                success: true,
                message: "Login successful",
                user: result.result,
            });

        } catch (error) {
            const data = JSON.parse(error?.message);
            console.log(data)
            throw new HttpException({
                error: true,
                message: data?.message
            }, data?.statusCode, {
                cause: error
            }
         )
        }

    }

    // @Put(':email/role')
    // async changeRoleOrPrivacyInfo(@Param() email: string) {
    //     // await this.updateRoleOrDataUserUsecase.execute();
    // }

    // @Put('/')
    // updateProfile(@Body() userDto: CoreUserInformationDto) {
    //     return this.updateAccount.execute(email, userDto)
    // }
}