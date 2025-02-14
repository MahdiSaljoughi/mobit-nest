import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return false;
    }

    const token = authHeader.split(' ')[1];

    if (!token) return false;

    try {
      const decoded = this.jwtService.verify(token);

      if (!decoded || !decoded.id) return false;

      request.user = decoded;

      return true;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      }
      return false;
    }
  }
}
