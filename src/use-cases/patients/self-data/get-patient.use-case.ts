import { PatientEntity } from 'src/core/domain/entities/patient.entity';
import { CustomNotFoundError } from 'src/core/domain/errors/not-found.error';
import { PatientRepository } from 'src/infrastructure/repositories/patient.repository';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';

export class GetPatientUsecase {
  constructor(private readonly patientRepository: PatientRepository) {}

  async execute(patientId: string): Promise<PatientEntity> {
    const data = await this.patientRepository.findByPatientId(patientId);

    if (!data)
      throw new CustomNotFoundError(`can't find patient with id ${patientId}`);
    return data;
  }
}
