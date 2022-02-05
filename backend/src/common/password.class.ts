import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

const config: argon2.Options & { raw?: false } = {
  type: argon2.argon2id,
  timeCost: 10,
  hashLength: 64,
};

@Injectable()
export class Password {
  static async hashPassword(password: string) {
    return argon2.hash(password, config);
  }

  static async comparePassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return argon2.verify(hash, password, config);
  }
}
