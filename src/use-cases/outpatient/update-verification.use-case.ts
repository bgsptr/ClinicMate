import { ScheduleEntity } from "src/core/domain/entities/schedule.entity";
import { OutpatientStatus, VerificationStatus } from "src/core/domain/interfaces/types/enum.type";
import { OutpatientRepository } from "src/infrastructure/repositories/outpatient.repository";
import { QueueOutpatientRepository } from "src/infrastructure/repositories/queue-outpatient.repsoitory";
import { ScheduleRepository } from "src/infrastructure/repositories/schedule.repository";

export class UpdateVerificationStatusUsecase {
    constructor(
        private readonly outpatientRepository: OutpatientRepository,
        private readonly queueOutpatientRepository: QueueOutpatientRepository,
        private readonly scheduleRepository: ScheduleRepository
    ) {}

    async execute(outpatientId: string, verifyStatus?: boolean, finishedStatus?: OutpatientStatus) {
        const verifyStatusOutpatient: VerificationStatus = verifyStatus 
            ? VerificationStatus.ACCEPTED 
            : VerificationStatus.REJECTED;
        
        const outpatientSelectedData = await this.outpatientRepository.updateVerificationStatus(outpatientId, verifyStatusOutpatient);
        const { id_doctor, id_rawat_jalan: outpatientIdDB } = outpatientSelectedData;
        if (!outpatientIdDB || !id_doctor) return;

        await this.outpatientRepository.updateStatusByOutpatientId(outpatientIdDB, verifyStatusOutpatient);

        if (verifyStatusOutpatient === VerificationStatus.ACCEPTED) {
            await this.handleAcceptedStatus(outpatientIdDB, id_doctor);
        } else {
            await this.queueOutpatientRepository.deleteById(outpatientIdDB);
        }
    }

    private async handleAcceptedStatus(outpatientIdDB: string, id_doctor: string) {
        const scheduleDoctors: ScheduleEntity[] = await this.scheduleRepository.findByIdDoctor(id_doctor);
        const { rawat_jalan_date: outpatientDate, queue_no: queueNo } = 
            await this.queueOutpatientRepository.updateById(outpatientIdDB);
        
        const schedule = this.getDoctorSchedule(scheduleDoctors, outpatientDate);
        if (!schedule) return;

        const { queueStartDB, queueEndDB } = this.calculateQueueTime(schedule, queueNo);

        await this.queueOutpatientRepository.updateById(outpatientIdDB, {
            queue_start_time: queueStartDB,
            queue_end_time: queueEndDB,
        });
    }

    private getDoctorSchedule(scheduleDoctors: ScheduleEntity[], outpatientDate: string): ScheduleEntity | undefined {
        const [year, month, date] = outpatientDate.split("-").map(Number);
        const appointmentDate = new Date(year, month - 1, date + 1);
        return scheduleDoctors.find((data) => data.day === String(appointmentDate.getDay()));
    }

    private calculateQueueTime(schedule: ScheduleEntity, queueNo: number) {
        const { start_time, end_time, slot } = schedule;
        const startTime = start_time.getTime();
        const endTime = end_time.getTime();
        const slotDuration = (endTime - startTime) / slot;

        const startQueueTime = startTime + (slotDuration * queueNo) - (8 * 3600 * 1000);
        const endQueueTime = startQueueTime + (10 * 60 * 1000);

        return {
            queueStartDB: this.formatTime(new Date(startQueueTime)),
            queueEndDB: this.formatTime(new Date(endQueueTime)),
        };
    }

    private formatTime(date: Date): string {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}:00`;
    }
}
