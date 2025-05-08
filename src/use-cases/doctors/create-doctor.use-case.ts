import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { CustomConflictError } from 'src/core/domain/errors/conflict.error';
import { AssignDoctorDto } from 'src/core/domain/interfaces/dtos/admins/assign-doctor.dto';
import { Role } from 'src/core/domain/interfaces/dtos/users/core-user-information.dto';
import { CreateDoctorMapper } from 'src/core/domain/mappers/doctors/create-doctor.mapper';
import { DoctorRepository } from 'src/infrastructure/repositories/doctor.repository';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';
import { v4 as uuidv4 } from 'uuid';

export class CreateDoctorUsecase {
  constructor(
    private doctorRepository: DoctorRepository,
    private userRepository: UserRepository,
    private createDoctorMapper: CreateDoctorMapper,
  ) {}

  async execute(doctorDto: AssignDoctorDto) {
    const stringId = uuidv4();

    const emailDoctor = String(doctorDto?.email);

    try {
      const doctor = await this.doctorRepository.findDoctorByEmail(emailDoctor);

      const user =
        await this.userRepository.findByEmailWithoutThrowErr(emailDoctor);

      // if (doctor) return this.createDoctorMapper.mapToResponseJson(
      //     true,
      //     401,
      //     "failed assign new doctor",
      // );

      if (doctor)
        throw new CustomConflictError(
          `failed assign new doctor, doctor with email: ${doctor.email} already exist`,
        );

      if (user)
        throw new CustomConflictError(
          `user with email: ${user.email} already registered as patient, please update the role as doctor if you want to continue`,
        );

      console.log(doctorDto);

      const doctorEntityData = this.createDoctorMapper.mapFromDto(
        doctorDto,
        stringId,
      );

      const userData = {
        email: doctorDto.email,
        password: "12345"
      }

      await this.userRepository.create(userData);
      
      await this.doctorRepository.create(doctorEntityData);

      // await this.userRepository.updateRoleByEmail(
      //   doctorEntityData?.email,
      //   Role.DOCTOR,
      // );

      return doctorEntityData;

      //   return this.createDoctorMapper.mapToResponseJson(
      //     false,
      //     200,
      //     'Successfully assign new doctor',
      //     doctorEntityData,
      //   );
    } catch (error) {
      console.log(error);
      // if (error instanceof PrismaClientKnownRequestError) {

      // }
      throw error;
      //   const data = {
      //     statusCode: 400,
      //     message: `${error?.message}`,
      //   };
      //   throw new Error(JSON.stringify(data));
    }
  }
}
