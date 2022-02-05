import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from '@/users/entities/user.entity';
import { CommentEntity } from './entities/comment.entity';
import { PostsService } from '@/posts/posts.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
    private readonly postService: PostsService,
  ) {}

  async create(
    content: PropType<CommentEntity, 'content'>,
    user: UserEntity,
    postId: number,
  ) {
    const post = await this.postService.findOne(postId);

    if (!post) throw new NotFoundException('Post not found');

    const comment = new CommentEntity({
      content,
      user,
      post,
    });

    return this.commentRepository.save(comment);
  }

  findAll() {
    return `This action returns all comments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
