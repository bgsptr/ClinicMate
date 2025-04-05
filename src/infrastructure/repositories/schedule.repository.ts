import { Repository } from "src/core/base/repository";
import { BaseRepository } from "./base.repository";
import { ScheduleEntity } from "src/core/domain/entities/schedule.entity";
import { IScheduleRepository } from "src/core/domain/interfaces/repositories/schedule.repository.interface";

export class ScheduleRepository extends BaseRepository implements IScheduleRepository {
    async create(data: ScheduleEntity): Promise<void> {
        await this.prisma.schedule.create({
            data: {
                id_schedule: data.id_schedule,
                id_doctor: data.id_doctor,
                day: data.day,
                start_time: data.start_time,
                end_time: data.end_time,
                slot: data.slot
            }
        });
    }

    async createAndFetch(data: ScheduleEntity, recordDayInteger: Record<string, string>): Promise<ScheduleEntity> {
        return await this.prisma.schedule.create({
            data: {
                id_schedule: data.id_schedule,
                id_doctor: data.id_doctor,
                day: data.day,
                start_time: data.start_time,
                end_time: data.end_time,
                slot: data.slot
            }
        });
    }

    async updateById(id: number | string, data: ScheduleEntity): Promise<void> {
        await this.prisma.schedule.update({
            data: {
                id_doctor: data.id_doctor,
                day: data.day,
                start_time: data.start_time,
                end_time: data.end_time,
                slot: data.slot
            },
            where: {
                id_schedule: String(id)
            }
        });
    }

    async deleteById(schedule_id: number | string): Promise<void> {
        await this.prisma.schedule.delete({
            where: {
                id_schedule: String(schedule_id)
            }
        })
    }

    async findByIdDoctor(id_doctor: string): Promise<ScheduleEntity[]> {
        return await this.prisma.schedule.findMany({
            where: { id_doctor }
        });
    }

    async findByScheduleId(id_schedule: string): Promise<ScheduleEntity | null> {
        return await this.prisma.schedule.findUnique({
            where: { id_schedule }
        })
    }

    async findAllSchedule(): Promise<ScheduleEntity[]> {
        return await this.prisma.schedule.findMany();
    }

    async checkScheduleExist(day: string, id_doctor: string): Promise<ScheduleEntity | null> {
        return await this.prisma.schedule.findFirst({
            where: {
                AND: {
                    day: day,
                    id_doctor: id_doctor
                }
            }
        })
    }
}