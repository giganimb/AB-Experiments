import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateDeviceDto } from '../devices/dto/create-device.dto';
import { DevicesService } from '../devices/devices.service';
import { Device } from '../devices/models/device.model';

@Injectable()
export class AuthService {
  constructor(
    private devicesService: DevicesService,
    private jwtService: JwtService,
  ) {}

  async login(createDeviceDto: CreateDeviceDto) {
    const device = await this.validateDevice(createDeviceDto);

    return this.generateToken(device);
  }

  async register(createDeviceDto: CreateDeviceDto) {
    const candidate = await this.devicesService.findById(createDeviceDto.id);

    if (candidate) {
      throw new HttpException(
        'Device already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const device = await this.devicesService.create(createDeviceDto);

    return this.generateToken(device);
  }

  private generateToken(device: Device) {
    const payload = { id: device.id };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateDevice(createDeviceDto: CreateDeviceDto) {
    const device = await this.devicesService.findById(createDeviceDto.id);

    if (!device) {
      throw new UnauthorizedException({ message: 'Invalid device' });
    }

    return device;
  }
}
