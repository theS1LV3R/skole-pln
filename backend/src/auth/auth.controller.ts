import { Controller, Post, Body, Req, Res } from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { Public } from '@/common/decorators/public.decorator';
import { CreateUserDto } from '@/auth/dto/create-user.dto';
import { UserEntity } from '@/users/entities/user.entity';
import { LoginResponseDto } from './dto/login-response.dto';
import { CookieOptions, Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { configType } from '@/config';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService<configType, true>,
  ) {}

  private cookieOptions: CookieOptions = {
    signed: false,
    httpOnly: false,
    secure: false,
    sameSite: 'strict',
    domain: null,
    encode: (val) => val,
  };

  @Post('login')
  @Public()
  @ApiResponse({
    status: 201,
    description: 'Successful',
    type: LoginResponseDto,
  })
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const loginData = await this.authService.login(loginUserDto);

    res.cookie('refreshToken', loginData[1].token.toString(), {
      ...this.cookieOptions,
      expires: loginData[1].expiresAt,
    });

    return loginData[0];
  }

  @Post('logout')
  @Public()
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const token = req.cookies.refreshToken as string;

    this.authService.logout(token);
    res.clearCookie('refreshToken', this.cookieOptions);
    return;
  }

  @Post('create')
  @Public()
  @ApiCreatedResponse({ description: 'Created a new user', type: UserEntity })
  @ApiConflictResponse({ description: 'Username already exists' })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('refresh')
  @Public()
  @ApiCreatedResponse({
    description: 'Created new access token and refresh token',
    type: LoginResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid refresh token',
  })
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = req.cookies.refreshToken as string;

    const data = await this.authService.refresh(token);

    res.cookie('refreshToken', data[1].token.toString(), {
      ...this.cookieOptions,
      expires: data[1].expiresAt,
    });

    return data[0];
  }
}
