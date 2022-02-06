import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_DISABLED_KEY } from '@/common/decorators/disabled.decorator';

@Injectable()
export class DisabledGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isDisabled = this.reflector.getAllAndOverride<boolean>(
      IS_DISABLED_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (isDisabled) {
      throw new ForbiddenException('Route is disabled');
    }

    return true;
  }
}
