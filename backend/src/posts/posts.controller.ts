import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Request as RequestType } from 'express';

import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './entities/post.entity';
import { Roles } from '@/common/decorators/roles.decorator';
import { Role } from '@/common/role.enum';
import { Disabled } from '@/common/decorators/disabled.decorator';

@Disabled()
@ApiTags('posts')
@ApiBearerAuth()
@ApiForbiddenResponse({
  description: 'User does not have permission to do the action',
})
@ApiUnauthorizedResponse({
  description: 'User is not logged in',
})
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @ApiCreatedResponse({ type: () => PostEntity })
  @Roles(Role.Admin)
  create(@Body() createPostDto: CreatePostDto, @Request() req: RequestType) {
    return this.postsService.create(createPostDto, req.user);
  }

  @Get()
  @ApiQuery({ name: 'userId', required: false, type: Number })
  findAll(@Query('userId') userId?: string) {
    if (userId) {
      return this.postsService.findAllByUser(+userId);
    }

    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Successfully deleted post' })
  remove(@Param('id') id: string, @Request() req: RequestType) {
    return this.postsService.remove(+id, req.user);
  }
}
