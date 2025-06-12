import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/sequelize';
import { Experiment } from './models/experiments.model';
import { CreateExperimentDto } from './dto/create-experiment.dto';
import { VariantsService } from '../variants/variants.service';
import { DevicesService } from '../devices/devices.service';
import { CreateAssignmentDto } from '../assignments/dto/create-assignment.dto';
import { AssignmentsService } from '../assignments/assignments.service';
import { Variant } from '../variants/models/variants.model';
import { Sequelize } from 'sequelize';
import { Assignment } from '../assignments/models/assignments.model';

@Injectable()
export class ExperimentsService {
  constructor(
    @InjectModel(Experiment) private experimentRepository: typeof Experiment,
    private variantsService: VariantsService,
    private devicesService: DevicesService,
    private assignmentsService: AssignmentsService,
    @InjectConnection() private sequelize: Sequelize,
  ) {}

  async create(createExperimentDto: CreateExperimentDto) {
    const experiment = await this.experimentRepository.create({
      name: createExperimentDto.name,
      key: createExperimentDto.key,
      status: createExperimentDto.status,
    });

    const variants = await this.variantsService.bulkCreateForExperiment(
      experiment.id,
      createExperimentDto.variants,
    );

    const devices = await this.devicesService.findAllActivated();

    const shuffledDevices = devices.sort(() => Math.random() - 0.5);

    const totalDevices = shuffledDevices.length;
    let currentIndex = 0;
    let assignments: CreateAssignmentDto[] = [];

    for (const variant of variants) {
      const count = Math.round((variant.distribution / 100) * totalDevices);
      const assignedDevices = shuffledDevices.slice(currentIndex, currentIndex + count);

      for (const device of assignedDevices) {
        assignments.push({
          deviceId: device.id,
          experimentId: experiment.id,
          variantId: variant.id,
        });
      }

      currentIndex += count;
    }

    const remainder = shuffledDevices.slice(currentIndex);

    if(remainder.length) {
      for (const device of remainder) {
        assignments.push({
          deviceId: device.id,
          experimentId: experiment.id,
          variantId: variants[variants.length - 1].id,
        });
      }
    }

    assignments = await this.assignmentsService.bulkCreate(assignments);

    return { experiment, variants, assignments };
  }

  async findAll() {
    await this.experimentRepository.findAll({include: [Variant]})
  }

  async findById(id: number) {
    return await this.experimentRepository.findByPk(id);
  }

  async getActiveExperimentsByDevice(deviceId: string) {
    const device = await this.devicesService.findById(deviceId);

    if(!device.isActivated) {
      device.isActivated = true;

      await device.save();

      return [];
    }

    const assignments = await this.assignmentsService.getActiveAssignmentsByDevice(deviceId);

    return {
      deviceId,
      assignments: assignments.map((a) => ({
        experiment: a.experiment,
        variant: a.variant,
      }))
    };
  }

  async completeExperiment(id: number) {
    const experiment = await this.experimentRepository.findByPk(id);

    if (!experiment) {
      throw new NotFoundException('Experiment is not found');
    }

    if (experiment.status === 'completed') {
      throw new BadRequestException('Experiment is already completed');
    }

    experiment.status = 'completed';
    await experiment.save();

    return experiment;
  }

  async getDeviceCountPerExperiment() {
    return await this.experimentRepository.findAll({
      attributes: [
        'id',
        'name',
        'key',
        'status',
        [
          this.sequelize.fn('COUNT', this.sequelize.fn('DISTINCT', this.sequelize.col('assignments.deviceId'))),
          'deviceCount'
        ],
      ],
      include: [
        {
          model: Assignment,
          attributes: [],
        },
      ],
      group: ['Experiment.id'],
      raw: false,
    });
  }
}
