import { CustomConflictError } from 'src/core/domain/errors/conflict.error';
import { CustomNotFoundError } from 'src/core/domain/errors/not-found.error';
import { CreateScheduleDto } from 'src/core/domain/interfaces/dtos/doctors/create-schedule.dto';
import { CreateScheduleMapper } from 'src/core/domain/mappers/admins/create-schedule.mapper';
import { ScheduleRepository } from 'src/infrastructure/repositories/schedule.repository';
import { TimeUtil } from 'src/utils/time.util';
import { v4 as uuidv4 } from 'uuid';

export class CreateScheduleUsecase {
  private readonly dayToIntegerMap: Record<string, string> = {
    sunday: '0',
    monday: '1',
    tuesday: '2',
    wednesday: '3',
    thursday: '4',
    friday: '5',
    saturday: '6',
  };

  constructor(
    private readonly scheduleRepository: ScheduleRepository,
    private readonly createScheduleMapper: CreateScheduleMapper,
  ) {}

  async execute(createScheduleDto: CreateScheduleDto) {
    const { schedule_start_time, schedule_end_time, schedule_day, id_doctor } =
      createScheduleDto;

    if (!id_doctor)
      throw new CustomNotFoundError(`cannot find doctor with id ${id_doctor}`);

    const newStartTime = TimeUtil.parseTimeString(schedule_start_time);
    const newEndTime = TimeUtil.parseTimeString(schedule_end_time);

    const formattedStartTime = TimeUtil.parseTimeString(
      TimeUtil.convertToLocalTimeAnd24HourFormat(
        newStartTime.toLocaleTimeString(),
      ),
    );

    const formattedEndTime = TimeUtil.parseTimeString(
      TimeUtil.convertToLocalTimeAnd24HourFormat(
        newEndTime.toLocaleTimeString(),
      ),
    );

    const scheduleEntity = this.createScheduleMapper.mapFromDto(
      createScheduleDto,
      uuidv4(),
      formattedStartTime,
      formattedEndTime,
    );

    const normalizedDay = scheduleEntity.day.toLowerCase();

    scheduleEntity.day = this.dayToIntegerMap[normalizedDay];

    const scheduleIsExist = await this.scheduleRepository.checkScheduleExist(
      scheduleEntity.day,
      id_doctor,
    );

    if (scheduleIsExist)
      throw new CustomConflictError(
        `Doctor with id ${id_doctor} already has a schedule on ${schedule_day}`,
      );

    const savedSchedule = await this.scheduleRepository.createAndFetch(
      scheduleEntity,
      this.dayToIntegerMap,
    );

    console.log(savedSchedule);
    console.log(formattedStartTime);
    console.log(formattedEndTime);

    savedSchedule.day = TimeUtil.capitalizeFirstLetter(savedSchedule.day);

    // console.log(savedSchedule.day)
    // console.log(response_start_time)
    const responseData = this.createScheduleMapper.mapFromEntity(
      savedSchedule,
      formattedStartTime,
      formattedEndTime,
    );

    return this.createScheduleMapper.mapToResponseJson(
      `success create new schedule with id ${savedSchedule.id_schedule}`,
      responseData,
    );
  }
}
