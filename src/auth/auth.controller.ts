import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('otp')
  sendOtp(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.sendOtp(createAuthDto);
  }

  @Post()
  verifyOtp(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.verifyOtp(createAuthDto);
  }
}
