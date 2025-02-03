import { Repository } from "src/core/base/repository";
import { PatientEntity } from "../../entities/patient.entity";

export interface IPatientRepository extends Repository<PatientEntity> {
    create(data: PatientEntity): Promise<void>;
    show(email: string): Promise<PatientEntity | null>;
    update(data: PatientEntity, email: string): Promise<void>;
    delete?(email: string): Promise<void>;
}