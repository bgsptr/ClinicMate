import { Repository } from "src/core/base/repository";
import { DoctorEntity } from "../../entities/doctor.entity";

export interface IDoctorRepository extends Repository<DoctorEntity> {
    create(data: DoctorEntity): Promise<void>;
    updateById(id: number | string, data: DoctorEntity): Promise<void>;
    updateAndGetDataWithId(id: number | string, data: DoctorEntity): Promise<Partial<DoctorEntity>>;
    deleteById(id: number | string): Promise<void>;
}