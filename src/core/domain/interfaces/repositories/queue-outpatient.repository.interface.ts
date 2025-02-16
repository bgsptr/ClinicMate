import { Repository } from "src/core/base/repository";
import { QueueOutpatientEntity } from "../../entities/queue-outpatient.entity";

export interface IQueueOutpatientRepository extends Repository<QueueOutpatientEntity> {
    create(data: QueueOutpatientEntity): Promise<void>;
    updateById(id: number | string, data: QueueOutpatientEntity): Promise<void>;
    deleteById(id: number | string): Promise<void>;
    findAllByOutpatientIds(outPatientIds: string[]);
}