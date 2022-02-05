import { JwtSignOptions } from '@nestjs/jwt';
import { JwtPayload } from './jwt';

export declare class JwtService {
  sign(payload: JwtPayload, options?: JwtSignOptions): string;
  signAsync(payload: JwtPayload, options?: JwtSignOptions): Promise<string>;
}
