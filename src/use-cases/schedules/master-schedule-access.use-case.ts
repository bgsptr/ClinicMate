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
    doctor_name: string;
    schedules: SchedulesDto[];
}

export class MasterScheduleAccessUsecase {

    constructor(
        private scheduleRepository: ScheduleRepository,
        private doctorRepository: DoctorRepository,
        private fetchScheduleMapper: FetchScheduleMapper
    ) {}

    async recursive(schedules: ScheduleEntity[], doctors: Doctor[], data: Map<string, SchedulesObject>, doctorIdx: number) {
        if (doctorIdx >= doctors.length) return;

        const { id_doctor: doctorId, name: doctorName } = doctors[doctorIdx];
        data.set(doctorId, {
            "doctor_name": doctorName,
            "schedules": []
        });

        schedules.map((schedule) => {
            if (schedule.id_doctor === doctorId) {
                data.get(doctorId)?.schedules?.push(schedule);
            }
        });

        // const doctorSchedules: ScheduleEntity[] = schedules.filter(schedule => schedule.id_doctor === doctorId);

        // const doctorData = data.get(doctorId);
        // if (doctorData) doctorData.schedules?.push(doctorSchedules);    

        return this.recursive(schedules, doctors, data, doctorIdx + 1);

    }

    async execute() {
        const data: Map<string, SchedulesObject> = new Map();
        const doctors = await this.doctorRepository.findAllDoctor();
        const schedules = await this.scheduleRepository.findAllSchedule();
        
        const doctorIdx = 0;
        const result = this.recursive(schedules, doctors, data, doctorIdx);

        return this.fetchScheduleMapper.mapToResponseJson(
            "schedule fetched successfully",
            result
        )
    }
    // {
        
            
    //              "id_doctor1" => {
    //                 "doctor_name": "waawa",
    //                 "schedules": [
    //                     {
    //                         "id1": 
    //                     },
    //                     {
    //                         "id2":
    //                     }
    //                 ]
    //             },
    //             "id_doctor2" => {
    //                 "doctor_name": "waawa",
    //                 "schedules": [
    //                     {
    //                         "id1": 
    //                     },
    //                     {
    //                         "id2":
    //                     }
    //                 ]
    //             }
            
    //     }
    
}