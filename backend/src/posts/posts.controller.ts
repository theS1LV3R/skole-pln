import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Request } from 'express';

import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './entities/post.entity';
import { Roles } from '@/common/decorators/roles.decorator';
import { Role } from '@/common/role.enum';
import { CommentEntity } from '@/comments/entities/comment.entity';
import { CreateCommentDto } from '@/comments/dto/create-comment.dto';
import { CommentsService } from '@/comments/comments.service';

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
  constructor(
    private readonly postsService: PostsService,
    private readonly commentService: CommentsService,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: () => PostEntity })
  @Roles(Role.User)
  create(@Body() createPostDto: CreatePostDto, @Req() req: Request) {
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
  remove(@Param('id') id: string, @Req() req: Request) {
    return this.postsService.remove(+id, req.user);
  }

  @Post(':id/comments')
  @ApiCreatedResponse({ type: () => CommentEntity })
  @Roles(Role.User)
  async createComment(
    @Param('id') id: string,
    @Body() createCommentDto: CreateCommentDto,
    @Req() req: Request,
  ) {
    const post = await this.postsService.findOne(+id);

    if (!post) throw new NotFoundException('Post not found');

    return this.commentService.create(createCommentDto.content, req.user, post);
  }

  @Get(':id/comments')
  @ApiParam({ name: 'id', required: true, description: 'Post ID' })
  @ApiQuery({ name: 'userId', required: false, type: Number })
  @ApiOkResponse({
    description: 'List of comments',
    type: () => CommentEntity,
    isArray: true,
  })
  async findAllComments(
    @Param('id') id: number,
    @Query('userId') userId?: number,
  ): Promise<CommentEntity[]> {
    const post = await this.postsService.findOne(id);

    if (!post) throw new NotFoundException('Post not found');

    const comments = await this.commentService.findAllByPost(post);

    if (userId) {
      return comments.filter((comment) => comment.user.id === userId);
    }

    return comments;
  }
}
