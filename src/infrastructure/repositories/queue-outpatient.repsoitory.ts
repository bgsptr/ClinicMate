import { IQueueOutpatientRepository } from "src/core/domain/interfaces/repositories/queue-outpatient.repository.interface";
import { BaseRepository } from "./base.repository";
import { QueueOutpatientEntity } from "src/core/domain/entities/queue-outpatient.entity";
import { QueueStatus } from "src/core/domain/interfaces/types/enum.type";

export interface QueueOutpatientJoin {
    id_queue: number;
    id_rawat_jalan: string;
    queue_no: number;
    queue_start_time: string | null;
    queue_end_time: string | null;
    queue_status: QueueStatus;
    rawat_jalan_date: string;
    rawatjalan: { id_doctor: string }
}

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

    async fetchSelectedQueueDoctorDate(id_doctor: string): Promise<QueueOutpatientJoin[]> {
        return this.prisma.rawatJalanQueue.findMany({
            where: {
                queue_status: { not: QueueStatus.WAITING },
                rawatjalan: { id_doctor }
            },
            include: {
                rawatjalan: {
                    select: { id_doctor: true }
                }
            }
        });
    }
    
}