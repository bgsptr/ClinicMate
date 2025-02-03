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
}