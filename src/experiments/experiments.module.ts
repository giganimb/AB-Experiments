import { Module } from '@nestjs/common';
import { ExperimentsController } from './experiments.controller';
import { ExperimentsService } from './experiments.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Experiment } from './models/experiments.model';
import { DevicesModule } from '../devices/devices.module';
import { VariantsModule } from '../variants/variants.module';
import { AssignmentsModule } from '../assignments/assignments.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [ExperimentsController],
  providers: [ExperimentsService],
  imports: [
    SequelizeModule.forFeature([Experiment]),
    DevicesModule,
    VariantsModule,
    AssignmentsModule,
    AuthModule,
  ],
  exports: [ExperimentsService]
})
export class ExperimentsModule {}
