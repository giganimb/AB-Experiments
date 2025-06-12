import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/sequelize';
import { Assignment } from './models/assignments.model';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { Experiment } from '../experiments/models/experiments.model';
import { Variant } from '../variants/models/variants.model';
import { Sequelize } from 'sequelize';

@Injectable()
export class AssignmentsService {
  constructor(
    @InjectModel(Assignment) private assignmentRepository: typeof Assignment,
    @InjectConnection() private sequelize: Sequelize,
  ) {}

  async bulkCreate(assignments: CreateAssignmentDto[]) {
    return this.assignmentRepository.bulkCreate(
      assignments,
      { returning: true },
    );
  }

  async getActiveAssignmentsByDevice(deviceId: string) {
    return this.assignmentRepository.findAll({
      where: { deviceId },
      include: [
        {
          model: Experiment,
          where: { status: 'active' },
          required: true,
        },
        {
          model: Variant,
          required: false,
        },
      ],
    })
  }

  async countTotalDevicesByExperiment(experimentId: number) {
    return await this.assignmentRepository.count({
      where: { experimentId },
      distinct: true,
      col: 'deviceId',
    } as any);
  }

  async findUniqDevicesByVariants(experimentId: number) {
    return await this.assignmentRepository.findAll({
      where: { experimentId },
      attributes: [
        'variantId',
        [this.sequelize.fn('COUNT', this.sequelize.fn('DISTINCT', this.sequelize.col('deviceId'))), 'deviceCount'],
      ],
      include: [
        {
          model: Variant,
          attributes: ['id', 'name'],
          required: true,
        },
      ],
      group: ['variantId', 'variant.id'],
      raw: true,
    });
  }
}
