import { Doctor } from "@prisma/client";
import { ScheduleEntity } from "src/core/domain/entities/schedule.entity";
import { FetchScheduleMapper } from "src/core/domain/mappers/admins/fetch-schedule.mapper";
import { DoctorRepository } from "src/infrastructure/repositories/doctor.repository";
import { ScheduleRepository } from "src/infrastructure/repositories/schedule.repository";

export class SchedulesDto {
    constructor(
        public id_schedule: string,
        public day: string,
        public start_time: Date,
        public end_time: Date,
        public slot: number
    ) {}
}

export interface SchedulesObject {
    doctor_id: string;
    doctor_name: string;
    schedules: SchedulesDto[];
}

export class MasterScheduleAccessUsecase {

    constructor(
        private scheduleRepository: ScheduleRepository,
        private doctorRepository: DoctorRepository,
        private fetchScheduleMapper: FetchScheduleMapper
    ) {}

    recursive(schedules: ScheduleEntity[], doctors: Doctor[], data: Map<string, SchedulesObject>, doctorIdx: number) {
        if (doctorIdx >= doctors.length) return data;

        const { id_doctor: doctorId, name: doctorName } = doctors[doctorIdx];

        if (!data.has(doctorId)) {
            data.set(doctorId, {
                "doctor_id": doctorId,
                "doctor_name": doctorName,
                "schedules": []
            });
        }

        schedules.map((schedule) => {
            if (schedule.id_doctor === doctorId) {
                const scheduleDto = this.fetchScheduleMapper.mapFromEntity(schedule);
                data.get(doctorId)?.schedules?.push(scheduleDto);
            }
        });
        
        return this.recursive(schedules, doctors, data, doctorIdx + 1);

    }

    async execute() {
        const data = new Map<string, SchedulesObject>();
        const doctors = await this.doctorRepository.findAllDoctor();
        const schedules = await this.scheduleRepository.findAllSchedule();

        this.recursive(schedules, doctors, data, 0);

        const resultArray = Array.from(data.values());

        console.log(resultArray)

        return this.fetchScheduleMapper.mapToResponseJson(
            "schedule fetched successfully",
            resultArray
        )
    }
}