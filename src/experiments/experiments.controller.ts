import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ExperimentsService } from './experiments.service';
import { CreateExperimentDto } from './dto/create-experiment.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('experiments')
export class ExperimentsController {
  constructor(private readonly experimentsService: ExperimentsService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createExperimentDto: CreateExperimentDto) {
    return this.experimentsService.create(createExperimentDto);
  }

  @Get()
  findAll() {
    return this.experimentsService.findAll();
  }

  @Get('/by-device/:deviceId')
  getByDevice(@Param('deviceId') deviceId: string) {
    return this.experimentsService.getActiveExperimentsByDevice(deviceId);
  }

  @UseGuards(AuthGuard)
  @Patch(':id/complete')
  complete(@Param('id', ParseIntPipe) id: number) {
    return this.experimentsService.completeExperiment(id);
  }
}
