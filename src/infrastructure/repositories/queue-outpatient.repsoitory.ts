import { IQueueOutpatientRepository } from 'src/core/domain/interfaces/repositories/queue-outpatient.repository.interface';
import { BaseRepository } from './base.repository';
import { QueueOutpatientEntity } from 'src/core/domain/entities/queue-outpatient.entity';
import { QueueStatus } from 'src/core/domain/interfaces/types/enum.type';

export interface QueueOutpatientJoin {
  id_queue: number;
  id_rawat_jalan: string;
  queue_no: number;
  queue_start_time: string | null;
  queue_end_time: string | null;
  queue_status: QueueStatus;
  rawat_jalan_date: string;
  rawatjalan: { id_doctor: string };
}

export interface QueueOutpatientDashboardJoin {
  id_rawat_jalan: string;
  queue_status: QueueStatus;
  rawat_jalan_date: string;
  queue_start_time: string | null;
  queue_end_time: string | null;
  rawatjalan: { id_doctor: string; id_patient: string };
}

export class QueueOutpatientRepository
  extends BaseRepository
  implements IQueueOutpatientRepository
{
  async findAllByOutpatientIds(outpatientIds: string[]) {
    return await this.prisma.rawatJalanQueue.findMany({
      where: {
        id_rawat_jalan: {
          in: outpatientIds,
        },
      },
    });
  }

  async create(queue: QueueOutpatientEntity): Promise<number> {
    const { id_queue, ...rest } = await this.prisma.rawatJalanQueue.create({
      data: {
        // id_queue: queue.id_queue,
        id_rawat_jalan: queue.id_rawat_jalan,
        queue_no: Number(queue.queue_no),
        queue_status: queue.queue_status,
        rawat_jalan_date: queue.rawat_jalan_date,
      },
    });

    return id_queue;
  }

  async updateById(
    id: number | string,
    data?: Partial<QueueOutpatientEntity>,
  ): Promise<{ rawat_jalan_date: string; queue_no: number }> {
    const { rawat_jalan_date, queue_no } =
      await this.prisma.rawatJalanQueue.update({
        where: {
          id_rawat_jalan: String(id),
        },
        data: {
          queue_status: QueueStatus.PROCESSED,
          queue_start_time: data?.queue_start_time,
          queue_end_time: data?.queue_end_time,
        },
      });

    return { rawat_jalan_date, queue_no };
  }

  async findById(id: number | string) {
    return await this.prisma.rawatJalanQueue.findFirstOrThrow({
      where: {
        id_rawat_jalan: String(id),
      },
    });
  }

  async deleteById(idQueue: string): Promise<void> {
    await this.prisma.rawatJalanQueue.delete({
      where: {
        id_rawat_jalan: idQueue,
      },
    });
  }

  async fetchSelectedQueueDoctorDate(
    id_doctor: string,
  ): Promise<QueueOutpatientJoin[]> {
    return this.prisma.rawatJalanQueue.findMany({
      where: {
        queue_status: { not: QueueStatus.WAITING },
        rawatjalan: { id_doctor },
      },
      include: {
        rawatjalan: {
          select: { id_doctor: true },
        },
      },
    });
  }

  async countFinishStatusOutpatientQueue() {
    return await this.prisma.rawatJalanQueue.count({
      where: {
        queue_status: QueueStatus.FINISHED,
      },
    });
  }

  async countProcessedStatusOutpatientQueue() {
    return await this.prisma.rawatJalanQueue.count({
      where: {
        queue_status: QueueStatus.PROCESSED,
      },
    });
  }

  async countPatientToday(queueOutpatientDate: string) {
    return await this.prisma.rawatJalanQueue.count({
      where: {
        rawat_jalan_date: queueOutpatientDate,
      },
    });
  }

  async outpatientJoinQueueOutpatient(todayDate: string) {
    return await this.prisma.rawatJalanQueue.findMany({
      where: {
        rawat_jalan_date: todayDate,
        queue_status: 'PROCESSED',
      },
      orderBy: {
        queue_start_time: 'asc',
      },
      select: {
        id_rawat_jalan: true,
        queue_status: true,
        rawat_jalan_date: true,
        queue_start_time: true,
        queue_end_time: true,
        rawatjalan: {
          select: {
            id_doctor: true,
            id_patient: true,
          },
        },
      },
    });
  }
}
