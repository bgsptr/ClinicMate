import { DoctorRepository } from "src/infrastructure/repositories/doctor.repository";
import { OutpatientRepository } from "src/infrastructure/repositories/outpatient.repository";
import { PatientRepository } from "src/infrastructure/repositories/patient.repository";
import { QueueOutpatientRepository } from "src/infrastructure/repositories/queue-outpatient.repsoitory";
import { QueryOutpatient } from "src/interface/controllers/outpatients/outpatient.controller";

export class FetchOutpatientsWithoutFilterUsecase {
    constructor(
        private readonly outpatientRepository: OutpatientRepository,
        private readonly patientRepository: PatientRepository,
        private readonly doctorRepository: DoctorRepository,
        private readonly queueOutpatientRepository: QueueOutpatientRepository,
    ) {}

    private countOccurrences<OutpatientEntity extends { id_doctor: string; id_patient: string }>(data: OutpatientEntity[]): { doctorIds: string[], patientIds: string[] } {
        const doctorCount = new Map<string, number>();
        const patientCount = new Map<string, number>();

        for (const { id_doctor, id_patient } of data) {
            doctorCount.set(id_doctor, (doctorCount.get(id_doctor) || 0) + 1);
            patientCount.set(id_patient, (patientCount.get(id_patient) || 0) + 1);
        }

        return {
            doctorIds: Array.from(doctorCount.keys()),
            patientIds: Array.from(patientCount.keys()),
        };
    }

    private mapArrayToMap<OutpatientEntity extends { id_doctor?: string; id_patient?: string; name: string }>(array: OutpatientEntity[], key: 'id_doctor' | 'id_patient'): Map<string, string> {
        return new Map(array.map(item => [item[key]!, item.name]));
    }

    async execute(query: QueryOutpatient) {
        const outpatients = await this.outpatientRepository.findAll();
        if (!outpatients) return null;

        const { doctorIds, patientIds } = this.countOccurrences(outpatients);

        const outPatientIds = outpatients.map(val => val.id_rawat_jalan);

        console.log(outPatientIds);

        const [doctors, patients, queueOutpatients] = await Promise.all([
            this.doctorRepository.selectedDoctorOnOutpatient(doctorIds),
            this.patientRepository.selectedPatientOnOutpatient(patientIds),
            this.queueOutpatientRepository.findAllByOutpatientIds(outPatientIds),
        ]);

        const doctorMap = this.mapArrayToMap(doctors, 'id_doctor');
        const patientMap = this.mapArrayToMap(patients, 'id_patient');

        console.log(queueOutpatients);

        return outpatients.map(outpatient => ({
            ...outpatient,
            doctor_name: doctorMap.get(outpatient.id_doctor) || 'Unknown',
            patient_name: patientMap.get(outpatient.id_patient) || 'Unknown',
            queue_no: queueOutpatients.filter(val => val.id_rawat_jalan === outpatient.id_rawat_jalan)[0]?.queue_no ?? null,
            queue_status: queueOutpatients.filter(val => val.id_rawat_jalan === outpatient.id_rawat_jalan)[0]?.queue_status ?? null,
            id_queue: queueOutpatients.filter(val => val.id_rawat_jalan === outpatient.id_rawat_jalan)[0]?.id_queue ?? null,
            rawat_jalan_date: queueOutpatients.filter(val => val.id_rawat_jalan === outpatient.id_rawat_jalan)[0]?.rawat_jalan_date ?? null,
            queue_start_time: queueOutpatients.filter(val => val.id_rawat_jalan === outpatient.id_rawat_jalan)[0]?.queue_start_time ?? null,
            queue_end_time: queueOutpatients.filter(val => val.id_rawat_jalan === outpatient.id_rawat_jalan)[0]?.queue_end_time ?? null,
        })).filter(data => !query.status || data.verifikasi_status?.toLowerCase() === query.status)
        .filter(data => !query.doctor_id || data.id_doctor === query.doctor_id)
        .filter(data => !query.keyword || data.id_patient.includes(query.keyword) || data.patient_name.includes(query.keyword))
        .filter(data => {
            console.log("filter of query name must consult_date")
            if (query.consult_date) {
                console.log("filter date success")
                const [year, month, date] = query.consult_date.split("-").map(Number);
                const dateRebuild = new Date(year, month - 1, date + 1).toISOString().split("T")[0];
                console.log(`${dateRebuild} vs ${data.rawat_jalan_date}`)
                return data.rawat_jalan_date === dateRebuild;
            }
            return true;
        });
    }
}