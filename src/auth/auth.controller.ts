import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateDeviceDto } from '../devices/dto/create-device.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() createDeviceDto: CreateDeviceDto) {
    return this.authService.login(createDeviceDto);
  }

  @Post('/register')
  register(@Body() createDeviceDto: CreateDeviceDto) {
    return this.authService.register(createDeviceDto);
  }
}
