import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '@/users/entities/user.entity';
import { Exclude } from 'class-transformer';

export class LoginResponseDto {
  constructor(partial?: Partial<LoginResponseDto>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  token: string;

  @ApiProperty()
  user: UserEntity;

  @Exclude()
  refreshToken: string;
}
