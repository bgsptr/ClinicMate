import {
  QueueDto,
  QueueInformation,
} from 'src/core/domain/interfaces/dtos/notifications/queue.dto';
import { QueueStatus } from 'src/core/domain/interfaces/types/enum.type';
import { QueueNotificationMapper } from 'src/core/domain/mappers/notifications/queue-notification.mapper';
import { DoctorRepository } from 'src/infrastructure/repositories/doctor.repository';
import { PatientRepository } from 'src/infrastructure/repositories/patient.repository';
import {
  QueueOutpatientDashboardJoin,
  QueueOutpatientRepository,
} from 'src/infrastructure/repositories/queue-outpatient.repsoitory';

export interface QueueOutpatient {
  outpatientId: string; // corresponds to id_rawat_jalan
  queueStatus: QueueStatus; // corresponds to queue_status
  appointmentDate: string; // corresponds to rawat_jalan_date
  appointmentStartTime: string; // corresponds to queue_start_time
  appointmentEndTime: string; // corresponds to queue_end_time
  doctorId: string; // corresponds to rawatjalan.id_doctor
  patientId: string; // corresponds to rawatjalan.id_patient
}

export class QueueOutpatientListUsecase {
  constructor(
    private readonly queueOutpatientRepository: QueueOutpatientRepository,
    private readonly patientRepository: PatientRepository,
    private readonly doctorRepository: DoctorRepository,
    private readonly queueNotificationMapper: QueueNotificationMapper,
  ) {}

  async execute() {
    const now = new Date();
    // const datePad = date.getDate().toString().padStart(2, '0');
    // const monthPad = date.getMonth().toString().padStart(2, '0');
    // const yearPad = date.getFullYear();
    // const todayDate = `${yearPad}-${monthPad}-${datePad}`;

    const todayDate = now.toISOString().slice(0, 10);

    const dashboardPatientTotal =
      await this.patientRepository.countTotalPatient();

    const unfinishedTotalQueue =
      await this.queueOutpatientRepository.countProcessedStatusOutpatientQueue();
    const finishedTotalQueue =
      await this.queueOutpatientRepository.countFinishStatusOutpatientQueue();

    const patientTotalToday =
      await this.queueOutpatientRepository.countPatientToday(todayDate);

    // get two patient right now and next queue no
    const results: QueueOutpatientDashboardJoin[] =
      await this.queueOutpatientRepository.outpatientJoinQueueOutpatient(
        todayDate,
      );

    const queueOutpatient: QueueOutpatient[] = results.map(
      (item: QueueOutpatientDashboardJoin) => ({
        outpatientId: item.id_rawat_jalan,
        queueStatus: item.queue_status,
        appointmentDate: item.rawat_jalan_date,
        appointmentStartTime: item.queue_start_time || '',
        appointmentEndTime: item.queue_end_time || '',
        doctorId: item.rawatjalan.id_doctor,
        patientId: item.rawatjalan.id_patient,
      }),
    );

    // check today date
    // const currTimeWitaUTC = new Date(now.getTime() + 8 * 60 * 60 * 1000);
    // const currTimeWitaUTC = new Date(now.getTime());
    const processedQueue = queueOutpatient.filter((queue: QueueOutpatient) => {
      const [hours, minutes, seconds] = queue.appointmentEndTime
        .split(':')
        .map(Number);
      const [year, month, date] = queue.appointmentDate.split('-').map(Number);
      const endTimeDateFormat = new Date(
        year,
        month - 1,
        date,
        hours,
        minutes,
        seconds,
      );

      console.log("now: ", now)
      console.log("end: ", endTimeDateFormat)
      return now.getTime() < endTimeDateFormat.getTime();
    });

    // const currentQueuePatient = processedQueue[0]
    //   ? {
    //       ...processedQueue[0],
    //       queueNo:
    //         queueOutpatient.findIndex(
    //           (q) => q.outpatientId === processedQueue[0].outpatientId,
    //         ) + 1,
    //     }
    //   : null;

    // const nextQueuePatient = processedQueue[1]
    //   ? {
    //       ...processedQueue[1],
    //       queueNo:
    //         queueOutpatient.findIndex(
    //           (q) => q.outpatientId === processedQueue[1].outpatientId,
    //         ) + 1,
    //     }
    //   : null;

    //   const queueData = processedQueue[0];
    //   const indexInOutpatient = queueOutpatient.findIndex(
    //     (queue) => queue.outpatientId === queueData.outpatientId,
    //   );

    //   const queueWithQueueNo = indexInOutpatient !== -1
    // ? {
    //     ...queueData,
    //     queueNo: indexInOutpatient + 1,
    //   }
    // : null;

    console.log("all queue: ", queueOutpatient);

    const getQueuePatientInfo = async (queue: QueueOutpatient | undefined) => {
      console.log("get queue logic: ", queue)
      if (!queue) return null;
      const queueNo =
        queueOutpatient.findIndex(
          (q) => q.outpatientId === queue.outpatientId,
        ) + 1;
      return {
        queue_no: queueNo,
        patient_id: queue.patientId,
        patient_name: await this.getPatientName(queue.patientId),
        doctor_id: queue.doctorId,
        doctor_name: await this.getDoctorName(queue.doctorId),
        start_consult_time: queue.appointmentStartTime,
        end_consult_time: queue.appointmentEndTime,
      };
    };

    const currentQueuePatient = await getQueuePatientInfo(processedQueue[0]);
    const nextQueuePatient = await getQueuePatientInfo(processedQueue[1]);

    console.log('Current:', currentQueuePatient);
    console.log('Next:', nextQueuePatient);
    
    return new QueueDto(
      dashboardPatientTotal,
      unfinishedTotalQueue,
      finishedTotalQueue,
      patientTotalToday,
      currentQueuePatient,
      nextQueuePatient
    );
  }

  private async getPatientName(patientId: string): Promise<string> {
    const result = await this.patientRepository.findByPatientId(patientId);
    return result?.name || '';
  }

  private async getDoctorName(doctorId: string): Promise<string> {
    const result = await this.doctorRepository.findDoctorById(doctorId);
    return result?.name || '';
  }
}
