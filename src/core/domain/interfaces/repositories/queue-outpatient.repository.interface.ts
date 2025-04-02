import { Repository } from "src/core/base/repository";
import { QueueOutpatientEntity } from "../../entities/queue-outpatient.entity";

export interface IQueueOutpatientRepository extends Repository<QueueOutpatientEntity> {
    create(data: QueueOutpatientEntity): Promise<number>;
    updateById(id: number | string, data: Partial<QueueOutpatientEntity>): Promise<{ rawat_jalan_date: string, queue_no: number }>;
    deleteById(id: number | string): Promise<void>;
    findAllByOutpatientIds(outPatientIds: string[]);
}