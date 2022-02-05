import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { IS_PUBLIC_KEY } from '@/common/decorators/public.decorator';
import { Request } from 'express';
import { UsersService } from '@/users/users.service';
import { JwtPayload } from '@/common/types/jwt';
import { JwtService } from '@nestjs/jwt';
import { TokenExpiredError } from 'jsonwebtoken';
import { ErrorEnum } from '@/common/error.enum';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;

    if (!authHeader) return false;

    let token: string | string[] = authHeader.split(' ');

    if (token.length !== 2 || token[0] !== 'Bearer') return false;

    token = token[1];

    return this.jwtService
      .verifyAsync<JwtPayload>(token)
      .then(async (payload) => {
        request.user = await this.validateUser(payload);
        return true;
      })
      .catch((err) => {
        if (err instanceof TokenExpiredError) {
          throw new UnauthorizedException(ErrorEnum.TOKEN_EXPIRED);
        } else {
          throw err;
        }
      });
  }

  async validateUser(payload: JwtPayload) {
    const user = await this.usersService.findOne(+payload.sub).catch((err) => {
      if (err instanceof NotFoundException) {
        throw new ForbiddenException();
      } else {
        throw err;
      }
    });

    return UsersService.serializeUser(user);
  }
}
