import { Role } from "src/core/domain/interfaces/dtos/users/core-user-information.dto";
import { DoctorRepository } from "src/infrastructure/repositories/doctor.repository";
import { ScheduleRepository } from "src/infrastructure/repositories/schedule.repository";

export class ScheduleDoctorIdUseCase {
    constructor(
        public scheduleRepository: ScheduleRepository,
        public doctorRepository: DoctorRepository
    ) {}

    async execute(doctorId: string, email?: string, role?: Role) {
        if (!email) {
            // throw error
            return
        }

        console.log(role);

        switch (role) {
            case "ADMIN":
                console.log(doctorId);
                return await this.scheduleRepository.findByIdDoctor(doctorId);
            case "PATIENT":
                // throw error
                return
            case "DOCTOR":
                const { id_doctor: doctorIdFromDatabase } = await this.doctorRepository.findDoctorIdByEmail(email);

                return await this.scheduleRepository.findByIdDoctor(doctorIdFromDatabase);
            default:
                throw new Error();
        }
    }
}