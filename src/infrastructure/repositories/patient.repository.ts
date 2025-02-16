import { IPatientRepository } from "src/core/domain/interfaces/repositories/patient.repository.interface";
import { BaseRepository } from "./base.repository";
import { PatientEntity } from "src/core/domain/entities/patient.entity";

export class PatientRepository extends BaseRepository implements IPatientRepository {
    async create(entity: PatientEntity): Promise<void> {
        await this.prisma.patient.create({
            data: {
                name: entity.name,
                email: entity.email,
                id_patient: entity.id_patient,
                birth_date: entity.birth_date,
                gender: entity.gender,
                address: entity.address,
                phone_number: entity.phone_number || "" 
            }
        })
    }

    async update(entity: PatientEntity, email: string): Promise<void> {
        await this.prisma.patient.update({
            data: {
                name: entity.name,
                email: entity.email,
                id_patient: entity.id_patient,
                birth_date: entity.birth_date,
                gender: entity.gender,
                address: entity.address,
                phone_number: entity.phone_number || "" 
            },
            where: { email }
        })
    }

    async show(email: string): Promise<PatientEntity | null> {
        return await this.prisma.patient.findFirstOrThrow({
            where: { email }
        })
    }

    async showAll(index: number): Promise<PatientEntity[]> {
        return await this.prisma.patient.findMany({
            take: 10,
            skip: index * 10,
            orderBy: {
                id_patient: 'asc'
            }
        });
    }

    async selectedPatientOnOutpatient(patientIds: string[]) {
        return await this.prisma.patient.findMany({
            where: {
                id_patient: {
                    in: patientIds
                }
            },
            select: {
                id_patient: true,
                name: true
            }
        })
    }
}