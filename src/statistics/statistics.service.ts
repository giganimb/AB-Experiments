import { Injectable, NotFoundException } from '@nestjs/common';
import { AssignmentsService } from '../assignments/assignments.service';
import { ExperimentsService } from '../experiments/experiments.service';

@Injectable()
export class StatisticsService {
  constructor(
    private experimentsService: ExperimentsService,
    private assignmentsService: AssignmentsService,
  ) {}

  async getExperimentsList() {
    return await this.experimentsService.findAll();
  }

  async getDeviceCountPerExperiment() {
    return await this.experimentsService.getDeviceCountPerExperiment();
  }

  async getDeviceDistributionByVariants(experimentId: number) {
    const experiment = await this.experimentsService.findById(experimentId);

    if (!experiment) {
      throw new NotFoundException('Experiment not found');
    }

    const totalDevices = await this.assignmentsService.countTotalDevicesByExperiment(experimentId);

    const variantStats = await this.assignmentsService.findUniqDevicesByVariants(experimentId);

    const distribution = variantStats.map((entry: any) => ({
      variantId: entry['variant.id'],
      variantName: entry['variant.option'],
      deviceCount: Number(entry.deviceCount),
      percentage: totalDevices
        ? Math.round((Number(entry.deviceCount) / Number(totalDevices)) * 100)
        : 0,
    }));

    return {
      experiment,
      distribution,
    };
  }
}
