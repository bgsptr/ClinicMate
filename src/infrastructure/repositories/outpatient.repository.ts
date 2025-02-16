import { IDoctorRepository } from "src/core/domain/interfaces/repositories/doctor.repository.interface";
import { BaseRepository } from "./base.repository";
import { IOutpatientRepository } from "src/core/domain/interfaces/repositories/outpatient.repository.interface";
import { OutpatientEntity } from "src/core/domain/entities/outpatient.entity";
import { OutpatientStatus, VerificationStatus } from "src/core/domain/interfaces/types/enum.type";

export class OutpatientRepository extends BaseRepository implements IOutpatientRepository {
    async create(data: OutpatientEntity): Promise<void> {
        await this.prisma.rawatJalan.create({
            data: {
                id_rawat_jalan: data.id_rawat_jalan,
                id_patient: data.id_patient,
                id_doctor: data.id_doctor,
                visit_date: data.visit_date,
                status_rawat_jalan: OutpatientStatus.UNFINISHED,
                // status_verifikasi: VerificationStatus.PENDING
            }
        })
    }

    async findAll(): Promise<OutpatientEntity[] | null> {
        return await this.prisma.rawatJalan.findMany();
    }

    // async filterByOutpatientStatus(outpatientStatus: OutpatientStatus): Promise<OutpatientEntity[] | null> {
    //     return await this.prisma.rawatJalan.findMany({
    //         where: {
    //             status_rawat_jalan: 
    //         }
    //     })
    // }

    // async filterByVerificationStatus(verificationStatus: VerificationStatus): Promise<OutpatientEntity[] | null> {
        
    // }

    async updateOutpatientStatus(outpatientId: string): Promise<void> {
        await this.prisma.rawatJalan.update({
            where: {
                id_rawat_jalan: outpatientId
            },
            data: {
                status_rawat_jalan: OutpatientStatus.FINISHED
            }
        });
    }

    // async updateVerificationStatus(outpatientId: string, allowed: boolean): Promise<void> {
    //     await this.prisma.rawatJalan.update({
    //         where: {
    //             id_rawat_jalan: outpatientId
    //         },
    //         data: {
    //             status_verifikasi: allowed ? VerificationStatus.ACCEPTED : VerificationStatus.REJECTED
    //         }
    //     });
    // }

    async updateById(id: number | string, data: OutpatientEntity): Promise<void> {
        await this.prisma.rawatJalan.update({
            where: {
                id_rawat_jalan: String(id)
            },
            data: {
                visit_date: data.visit_date,
                id_doctor: data.id_doctor,
            }
        })
    }
}