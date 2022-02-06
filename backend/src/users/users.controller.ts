import { Controller, Delete, Get, Req } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { DeleteUserResponseDto } from './dto/delete-user-response.dto';

import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
@ApiNotFoundResponse({ description: 'User not found' })
@ApiForbiddenResponse({ description: 'User not logged in' })
@ApiBearerAuth()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  @ApiOkResponse({
    type: UserEntity,
    description: 'Returns currently logged in user object',
  })
  async me(@Req() req: Request) {
    return this.usersService.findOne(req.user.id);
  }

  @Delete('me')
  @ApiOkResponse({ description: 'User deleted', type: DeleteUserResponseDto })
  async delete(@Req() req: Request) {
    return this.usersService.delete(req.user);
  }

  @Get(':id')
  @ApiOkResponse({ type: UserEntity })
  async findById(@Req() req: Request) {
    return this.usersService.findOne(+req.params.id);
  }
}
