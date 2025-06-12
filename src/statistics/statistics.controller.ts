import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService:StatisticsService) {}

  @Get('/experiments')
  getExperimentsList() {
    return this.statisticsService.getExperimentsList();
  }

  @Get('/devices-per-experiment')
  getDeviceCounts() {
    return this.statisticsService.getDeviceCountPerExperiment();
  }

  @Get('/experiments/:id/distribution')
  getVariantDistribution(@Param('id', ParseIntPipe) experimentId: number) {
    return this.statisticsService.getDeviceDistributionByVariants(experimentId);
  }
}
