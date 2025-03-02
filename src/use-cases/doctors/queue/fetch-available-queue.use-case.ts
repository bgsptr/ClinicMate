import { Schedule } from "@prisma/client";
import { QueueOutpatientJoin, QueueOutpatientRepository } from "src/infrastructure/repositories/queue-outpatient.repsoitory";
import { ScheduleRepository } from "src/infrastructure/repositories/schedule.repository";
import { TimeUtil } from "src/utils/time.util";

export class FetchAvailableQueueUsecase {
    constructor(
        private scheduleRepository : ScheduleRepository,
        private queueOutpatientRepository : QueueOutpatientRepository
    ) {}

    async execute(doctorId: string, consultDate: string) {
        const datas = await this.queueOutpatientRepository.fetchSelectedQueueDoctorDate(doctorId);

        const filteredAttribute = datas.reduce<number[]>((prev, data: QueueOutpatientJoin) => {
            if (data.rawat_jalan_date === consultDate) {
                prev.push(data.queue_no);
            }
            return prev;
        }, []);

        console.log(`after filtered by date on ${consultDate}: `, filteredAttribute)

        const [year, month, day] = consultDate?.split("-").map(Number);

        const date = new Date(year, month - 1, day + 1, 0, 0, 0);

        const dayIdx = date.getDay();

        console.log(date)
        console.log(dayIdx)

        const schedules: Schedule[] = await this.scheduleRepository.findByIdDoctor(doctorId);

        const selectedSchedule = schedules.find((schedule) => Number(schedule.day) === dayIdx);
        if (!selectedSchedule) return; 
        const { start_time: startTime, end_time: endTime, slot } = selectedSchedule;

        console.log(selectedSchedule)

        let startTimeStringIndoLocal = TimeUtil.parseStringTime(startTime);

        return Array.from({ length: slot }, (_, queueSeq) => {
            const { startTime, endTime } = TimeUtil.generateStartTimeAndEndTime(startTimeStringIndoLocal)
            startTimeStringIndoLocal += 10 * 60 * 1000;
            queueSeq += 1;
            const finalStatus = filteredAttribute.find((queueNum) => queueNum === queueSeq);
            return { queueNo: queueSeq, startTime, endTime, availableStatus: finalStatus ? false : true }
        })

        // console.log(startTimeString);

        // const temp: any = [];
        // for (let i = 0; i < selectedSchedule.slot; ++i) {
        //     let dateParse = new Date(startTimeString);
        //     let timeNowString = dateParse.toTimeString().split(" ")[0];
        //     temp.push({
        //         i,
        //         timeNowString
        //     });
        //     startTimeString += (10 * 60 * 1000)
        // }

        // return temp
    }
}