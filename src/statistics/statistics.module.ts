import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import { ExperimentsModule } from '../experiments/experiments.module';
import { AssignmentsModule } from '../assignments/assignments.module';

@Module({
  controllers: [StatisticsController],
  providers: [StatisticsService],
  imports: [
    ExperimentsModule,
    AssignmentsModule,
  ]
})
export class StatisticsModule {}
