import { Repository } from "src/core/base/repository";
import { ScheduleEntity } from "../../entities/schedule.entity";

export interface IScheduleRepository extends Repository<ScheduleEntity> {
    create(data: ScheduleEntity): Promise<void>;
    updateById?(id: number | string, data: ScheduleEntity): Promise<void>;
    deleteById?(id: number | string): Promise<void>;
}