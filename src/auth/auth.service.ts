import { UsersService } from './../users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
    private UsersService: UsersService,
  ) {}

  async sendOtp(createAuthDto: CreateAuthDto) {
    const recentOtp = await this.prisma.otp.findFirst({
      where: {
        phone: createAuthDto.phone,
        created_at: { gt: new Date(Date.now() - 2 * 60 * 1000) },
      },
    });

    if (recentOtp) {
      throw new UnauthorizedException('لطفا کمی صبر کنید و دوباره تلاش کنید.');
    }

    const otpCode = Math.floor(1000 + Math.random() * 9000).toString();

    await this.prisma.otp.create({
      data: {
        code: otpCode,
        phone: createAuthDto.phone,
        expires_at: new Date(Date.now() + 2 * 60 * 1000),
      },
    });

    return { message: 'کد تایید با موفقیت ارسال شد', otp: otpCode };
  }

  async verifyOtp(createAuthDto: CreateAuthDto) {
    const otp = await this.prisma.otp.findFirst({
      where: {
        phone: createAuthDto.phone,
        expires_at: { gt: new Date() },
      },
      orderBy: {
        expires_at: 'desc',
      },
    });

    if (!otp) {
      throw new UnauthorizedException('کد تایید نامعتبر است');
    }

    if (new Date() > otp.expires_at) {
      await this.prisma.otp.delete({
        where: {
          id: otp.id,
        },
      });

      throw new UnauthorizedException('کد تایید منقضی شده است');
    }

    if (otp?.code !== createAuthDto.otp) {
      throw new UnauthorizedException('کد وارد شده اشتباه است');
    }

    await this.prisma.otp.delete({
      where: { id: otp.id },
    });

    let user = await this.UsersService.findByPhone(createAuthDto.phone);
    if (!user) {
      user = await this.UsersService.create({
        phone: createAuthDto.phone,
        user_name: createAuthDto.phone,
      });
    }

    const access_token = this.jwtService.sign({ id: user.id });
    return { access_token };
  }
}
