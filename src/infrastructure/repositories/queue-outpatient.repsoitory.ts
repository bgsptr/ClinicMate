import { IQueueOutpatientRepository } from "src/core/domain/interfaces/repositories/queue-outpatient.repository.interface";
import { BaseRepository } from "./base.repository";
import { QueueOutpatientEntity } from "src/core/domain/entities/queue-outpatient.entity";
import { QueueStatus } from "src/core/domain/interfaces/types/enum.type";

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

    async create(queue: QueueOutpatientEntity): Promise<void> {
        await this.prisma.rawatJalanQueue.create({
            data: {
                id_queue: queue.id_queue,
                id_rawat_jalan: queue.id_rawat_jalan,
                queue_no: queue.queue_no,
                queue_status: queue.queue_status,
                rawat_jalan_date: queue.rawat_jalan_date
            }
        })
    }

    async updateById(id: number | string, data?: Partial<QueueOutpatientEntity>): Promise<{ rawat_jalan_date: string, queue_no: number }> {
        const { rawat_jalan_date, queue_no } = await this.prisma.rawatJalanQueue.update({
            where: {
                id_rawat_jalan: String(id)
            },
            data: {
                queue_status: QueueStatus.PROCESSED,
                queue_start_time: data?.queue_start_time,
                queue_end_time: data?.queue_end_time,
            }
        })

        return { rawat_jalan_date, queue_no };
    }

    async deleteById(idQueue: string): Promise<void> {
        await this.prisma.rawatJalanQueue.delete({
            where: {
                id_rawat_jalan: idQueue
            }
        })
    }

    
}