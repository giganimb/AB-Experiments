import { Module } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Assignment } from './models/assignments.model';

@Module({
  controllers: [],
  providers: [AssignmentsService],
  imports: [
    SequelizeModule.forFeature([Assignment]),
  ],
  exports: [AssignmentsService],
})
export class AssignmentsModule {}
