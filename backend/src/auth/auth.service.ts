import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';

import { UsersService } from '@/users/users.service';
import { UserEntity } from '@/users/entities/user.entity';
import { JwtPayload } from '@/common/types/jwt';
import { CreateUserDto } from '@/auth/dto/create-user.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Password } from '@/common/password.class';
import { RefreshTokenEntity } from './entities/refresh-token.entity';
import { configType } from '@/config';
import { ErrorEnum } from '@/common/error.enum';
import * as dayjs from 'dayjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(RefreshTokenEntity)
    private refreshTokenRepository: Repository<RefreshTokenEntity>,
    private configService: ConfigService<configType>,
  ) {}

  async register(data: CreateUserDto) {
    const user = await this.usersService.create(data);
    return user;
  }

  async login(
    loginUserDto: LoginUserDto,
  ): Promise<[LoginResponseDto, RefreshTokenEntity]> {
    const user = await this.validateUser(
      loginUserDto.username,
      loginUserDto.password,
    );

    if (!user) {
      throw new UnauthorizedException();
    }

    const refreshToken = await this.genRefreshToken(user);
    const payload: JwtPayload = { username: user.username, sub: user.id };
    return [
      new LoginResponseDto({
        token: this.jwtService.sign(payload),
        user,
        refreshToken: refreshToken.token,
      }),
      refreshToken,
    ];
  }

  async logout(token?: string) {
    if (!token) return;

    const refreshToken = await this.refreshTokenRepository.findOne({
      where: { token: token },
    });

    if (!refreshToken) return;

    refreshToken.manuallyRevoked = true;
    refreshToken.revokationDate = new Date();

    return this.refreshTokenRepository.save(refreshToken);
  }

  async refresh(
    token?: string,
  ): Promise<[LoginResponseDto, RefreshTokenEntity]> {
    const refreshToken = await this.refreshTokenRepository.findOne({
      where: { token },
      relations: ['user'],
      loadEagerRelations: true,
    });

    if (!refreshToken || refreshToken.isInvalid) {
      throw new UnauthorizedException(ErrorEnum.REFRESH_TOKEN_INVALID);
    }

    const user = await this.usersService.findOne(refreshToken.user.id);

    if (!user) {
      throw new UnauthorizedException(ErrorEnum.REFRESH_TOKEN_INVALID);
    }

    const newToken = await this.genRefreshToken(user, refreshToken);

    refreshToken.replacedBy = newToken;

    return [
      new LoginResponseDto({
        token: this.jwtService.sign({ username: user.username, sub: user.id }),
        user,
        refreshToken: newToken.token,
      }),
      newToken,
    ];
  }

  async validateUser(username: string, pass: string): Promise<UserEntity> {
    const user = await this.usersService.findByUsername(username);

    if (!user) throw new UnauthorizedException();

    if (user.scheduledForDeletion) {
      throw new BadRequestException("User's account is scheduled for deletion");
    }

    if (await Password.comparePassword(pass, user.password)) {
      return user;
    }

    return null;
  }

  async genRefreshToken(
    user: UserEntity,
    replaces?: RefreshTokenEntity,
  ): Promise<RefreshTokenEntity> {
    const refreshTokenDuration = this.configService.get(
      'refresh_token.duration',
      { infer: true },
    );

    const expiry = dayjs(new Date()).add(
      refreshTokenDuration[0],
      refreshTokenDuration[1],
    );

    const token = this.jwtService.sign(
      {
        username: user.username,
        sub: user.id,
      },
      {
        secret: this.configService.get('refresh_token.secret', { infer: true }),
        expiresIn: `${expiry.diff() / 1000}s`,
      },
    );

    const refreshToken = new RefreshTokenEntity({
      token,
      user,
      replaces: replaces,
      expiresAt: expiry.toDate(),
    });

    await this.refreshTokenRepository.save(refreshToken);

    return refreshToken;
  }
}
