import { IDoctorRepository } from "src/core/domain/interfaces/repositories/doctor.repository.interface";
import { BaseRepository } from "./base.repository";
import { IOutpatientRepository } from "src/core/domain/interfaces/repositories/outpatient.repository.interface";
import { OutpatientEntity } from "src/core/domain/entities/outpatient.entity";
import { OutpatientStatus, VerificationStatus } from "src/core/domain/interfaces/types/enum.type";
import { RawatJalanStatus } from "@prisma/client";

export class OutpatientRepository extends BaseRepository implements IOutpatientRepository {
    async create(data: OutpatientEntity): Promise<Partial<OutpatientEntity>> {
        const { id_rawat_jalan, status_rawat_jalan, verifikasi_status, id_patient } = await this.prisma.rawatJalan.create({
            data: {
                id_rawat_jalan: data.id_rawat_jalan,
                id_patient: data.id_patient,
                id_doctor: data.id_doctor,
                visit_date: data.visit_date,
                status_rawat_jalan: OutpatientStatus.UNFINISHED,
                verifikasi_status: data.verifikasi_status
            }
        })

        return {
            id_patient,
            id_rawat_jalan,
            status_rawat_jalan,
            verifikasi_status
        }
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

    async updateVerificationStatus(outpatientId: string, status: VerificationStatus): Promise<Partial<OutpatientEntity>> {

        const { id_rawat_jalan, id_patient, id_doctor, visit_date, status_rawat_jalan, verifikasi_status } = await this.prisma.rawatJalan.update({
            where: {
                id_rawat_jalan: outpatientId
            },
            data: {
                verifikasi_status: status
            }
        });

        return {
            id_doctor,
            id_rawat_jalan
        };
    }

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

    async updateStatusByOutpatientId(outpatientIdDB: string, verifyStatusOutpatient: VerificationStatus) {
        await this.prisma.rawatJalan.update({
            where: {
                id_rawat_jalan: outpatientIdDB
            },
            data: {
                verifikasi_status: verifyStatusOutpatient
            }
        })
    }

    async findEmailJoinOutpatientAndPatientByOutpatientId(outpatientId: string) {
        const { patient } = await this.prisma.rawatJalan.findFirstOrThrow({
            include: {
                patient: {
                    select: {
                        email: true
                    }
                }
            },
            where: {
                AND: {
                    id_rawat_jalan: outpatientId,
                    status_rawat_jalan: RawatJalanStatus.UNFINISHED,
                    verifikasi_status: VerificationStatus.ACCEPTED
                }
            }
        })

        return patient.email;
    }
}