import { BaseRepository } from "./base.repository";

export class DoctorRepository extends BaseRepository {
    async findAllDoctor() {
        return await this.prisma.doctor.findMany();
    }

    async findDoctorById(email: string) {
        return await this.prisma.doctor.findUniqueOrThrow({
            where: {
                email
            },
            select: {
                id_doctor: true
            }
        })
    }
}