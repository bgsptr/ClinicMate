import { Repository } from "src/core/base/repository";
import { OutpatientEntity } from "../../entities/outpatient.entity";
import { OutpatientStatus, VerificationStatus } from "../types/enum.type";
import { ShowOutpatientDto } from "../dtos/outpatients/show-outpatient.dto";

export interface IOutpatientRepository extends Repository<OutpatientEntity> {
    create(data: OutpatientEntity): Promise<Partial<OutpatientEntity>>;
    findAll(): Promise<OutpatientEntity[] | null>;
    filterByVerificationStatus?(verificationStatus: VerificationStatus): Promise<OutpatientEntity[] | null>;
    filterByOutpatientStatus?(outpatientStatus: OutpatientStatus): Promise<OutpatientEntity[] | null>;
    updateVerificationStatus?(outpatientId: string, allowed: VerificationStatus): Promise<Partial<OutpatientEntity>>;
    updateOutpatientStatus?(outpatientId: string): Promise<void>;
    // update?(data: OutpatientEntity, email: string): Promise<void>;
    // delete?(email: string): Promise<void>;
}