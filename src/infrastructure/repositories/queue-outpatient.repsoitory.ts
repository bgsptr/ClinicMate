import { IQueueOutpatientRepository } from "src/core/domain/interfaces/repositories/queue-outpatient.repository.interface";
import { BaseRepository } from "./base.repository";
import { QueueOutpatientEntity } from "src/core/domain/entities/queue-outpatient.entity";

export class QueueOutpatientRepository extends BaseRepository implements IQueueOutpatientRepository {
    async findAllByOutpatientIds(outpatientIds: string[]) {
        return await this.prisma.rawatJalanQueue.findMany({
            where: {
                id_rawat_jalan: {
                    in: outpatientIds
                }
            }
        })
    }

    async create(data: QueueOutpatientEntity): Promise<void> {
        
    }

    async updateById(id: number | string, data: QueueOutpatientEntity): Promise<void> {
        
    }

    async deleteById(id: number | string): Promise<void> {
        
    }
}