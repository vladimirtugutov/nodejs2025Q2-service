import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const { url, method, headers } = request;

    const publicRoutes = [
      { method: 'POST', path: '/auth/signup' },
      { method: 'POST', path: '/auth/login' },
      { method: 'POST', path: '/auth/refresh' },
    ];

    if (
      publicRoutes.some(
        (route) => route.method === method && route.path === url,
      ) ||
      url === '/' ||
      url.startsWith('/doc')
    ) {
      return true;
    }

    const authHeader = headers['authorization'];
    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or malformed Authorization header');
    }

    const token = authHeader.split(' ')[1];
    try {
      const payload = this.jwtService.verify(token);
      request['user'] = payload;
      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
