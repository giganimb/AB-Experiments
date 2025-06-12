import { Module } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Device } from './models/device.model';

@Module({
  controllers: [DevicesController],
  providers: [DevicesService],
  imports: [
    SequelizeModule.forFeature([Device])
  ],
  exports: [DevicesService],
})
export class DevicesModule {}
