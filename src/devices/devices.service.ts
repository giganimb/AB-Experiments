import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Device } from './models/device.model';

@Injectable()
export class DevicesService {
  constructor(
    @InjectModel(Device) private deviceRepository: typeof Device,
  ) {}

  async create(createDeviceDto: CreateDeviceDto) {
    return await this.deviceRepository.create(createDeviceDto);
  }

  async findAll() {
    return await this.deviceRepository.findAll();
  }

  async findAllActivated() {
    return await this.deviceRepository.findAll({
      where: {
        isActivated: true,
      }
    });
  }

  async findById(id: string) {
    const device = await this.deviceRepository.findByPk(id);

    if(!device) {
      throw new HttpException('Device not found', HttpStatus.NOT_FOUND);
    }

    return device;
  }

  async activate(id: string) {
    const device = await this.findById(id);

    device.isActivated = true;

    await device.save();

    return device;
  }
}
