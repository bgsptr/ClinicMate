import { CreateOutpatientDto } from 'src/core/domain/interfaces/dtos/outpatients/create-outpatient.dto';
import { CreateQueueOutpatientDto } from 'src/core/domain/interfaces/dtos/queue-outpatients/create-queue-outpatient.dto';
import { Role } from 'src/core/domain/interfaces/dtos/users/core-user-information.dto';
import { CreateOutpatientMapper } from 'src/core/domain/mappers/outpatients/create-outpatient.mapper';
import { CreateQueueOutpatientMapper } from 'src/core/domain/mappers/queue-outpatient/create-queue-outpatient.mapper';
import { OutpatientRepository } from 'src/infrastructure/repositories/outpatient.repository';
import { QueueOutpatientRepository } from 'src/infrastructure/repositories/queue-outpatient.repsoitory';
import { TimeUtil } from 'src/utils/time.util';
import { v4 as uuidv4 } from 'uuid';

export class CreateOutpatietUsecase {
  constructor(
    private readonly outpatientRepository: OutpatientRepository,
    private readonly createOutpatientMapper: CreateOutpatientMapper,
    private readonly createQueueOutpatientMapper: CreateQueueOutpatientMapper,
    private readonly queueOutpatientRepository: QueueOutpatientRepository,
  ) {}

  async execute(outpatientDto: CreateOutpatientDto, role: Role) {
    try {
      console.log(`Creating outpatient entry, assigned by role: ${role}`);

      // Parse visit date and initialize required variables
      const queueDate = TimeUtil.parseTimeString(outpatientDto.visitDate);
      const outpatientCreatedAt = new Date();
      const outpatientId = uuidv4();

      // Map outpatient DTO to entity
      const outpatientEntity = this.createOutpatientMapper.mapFromDto(
        outpatientDto,
        outpatientId,
        outpatientCreatedAt,
        role,
      );

      // Insert outpatient entry
      const { id_rawat_jalan: outpatientIdVerified } =
        await this.outpatientRepository.create(outpatientEntity);
      if (!outpatientIdVerified) {
        throw new Error('Failed to create outpatient entry');
      }

      // Ensure queue details exist before proceeding
      if (!outpatientDto.queueNo || !outpatientDto.outpatientQueueDate) {
        throw new Error(
          'Queue details missing, cannot proceed with outpatient creation',
        );
      }

      // Prepare and insert queue outpatient entry
      const queueEntity = this.createQueueOutpatientMapper.mapFromDto(
        new CreateQueueOutpatientDto(
          outpatientIdVerified,
          outpatientDto.queueNo,
          outpatientDto.outpatientQueueDate,
        ),
      );
      await this.queueOutpatientRepository.create(queueEntity);

      console.log(
        `Outpatient created successfully with ID: ${outpatientIdVerified}`,
      );
      return outpatientIdVerified;
    } catch (error) {
      console.error('Error in CreateOutpatientUsecase:', error.message);
      throw error; // Ensure the error is propagated
    }
  }
}
