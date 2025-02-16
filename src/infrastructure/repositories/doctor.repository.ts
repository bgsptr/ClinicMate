import { IDoctorRepository } from "src/core/domain/interfaces/repositories/doctor.repository.interface";
import { BaseRepository } from "./base.repository";
import { DoctorEntity } from "src/core/domain/entities/doctor.entity";

export class DoctorRepository extends BaseRepository implements IDoctorRepository {
    async create(data: DoctorEntity): Promise<void> {
        await this.prisma.doctor.create({
            data: {
                id_doctor: data.id_doctor,
                name: data.name,
                email: data.email,
                address: data.address,
                phone_number: data.phone_number
            }
        });
    }

    async updateById(id: number | string, data: DoctorEntity): Promise<void> {
        await this.prisma.doctor.update({
            data: {
                name: data.name,
                // email: data.email,
                address: data.address,
                phone_number: data.phone_number
            },
            where: { 
                id_doctor: String(id)
            }
        })
    }

    async updateAndGetDataWithId(id: number | string, data: DoctorEntity): Promise<Partial<DoctorEntity>> {
        const { email, ...doctorEntity } = await this.prisma.doctor.update({
            data: {
                name: data.name,
                // email: data.email,
                address: data.address,
                phone_number: data.phone_number
            },
            where: { 
                id_doctor: String(id)
            }
        })
        return doctorEntity
    }

    async updateByEmail(email: string, data: DoctorEntity): Promise<void> {
        await this.prisma.doctor.update({
            data: {
                name: data.name,
                // email: data.email,
                address: data.address,
                phone_number: data.phone_number
            },
            where: { 
                email
            }
        })
    }

    async updateAndGetDataWithEmail(emailDoctor: string, data: DoctorEntity): Promise<Partial<DoctorEntity>> {
        const { email, ...doctorEntity } = await this.prisma.doctor.update({
            data: {
                name: data.name,
                // email: data.email,
                address: data.address,
                phone_number: data.phone_number
            },
            where: { 
                email: emailDoctor
            }
        })
        return doctorEntity
    }

    async deleteById(id: number | string): Promise<void> {
        await this.prisma.doctor.delete({
            where: { id_doctor: String(id) }
        })
    }

    async findAllDoctor() {
        return await this.prisma.doctor.findMany();
    }

    async findDoctorIdByEmail(email: string) {
        return await this.prisma.doctor.findUniqueOrThrow({
            where: {
                email
            },
            select: {
                id_doctor: true
            }
        })
    }

    async findDoctorByEmail(email: string): Promise<DoctorEntity | null> {
        return await this.prisma.doctor.findUnique({
            where: { email }
        })
    }

    async findDoctorById(id_doctor: string): Promise<DoctorEntity> {
        return await this.prisma.doctor.findUniqueOrThrow({
            where: { id_doctor }
        })
    }

    async selectedDoctorOnOutpatient(doctorIds: string[]) {
        return await this.prisma.doctor.findMany({
            where: {
                id_doctor: {
                    in: doctorIds
                }
            },
            select: {
                id_doctor: true,
                name: true
            }
        })
    }
}