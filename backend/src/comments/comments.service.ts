import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from '@/users/entities/user.entity';
import { CommentEntity } from './entities/comment.entity';
import { PostEntity } from '@/posts/entities/post.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
  ) {}

  async create(
    content: PropType<CommentEntity, 'content'>,
    user: UserEntity,
    post: PostEntity,
  ) {
    if (!post) throw new NotFoundException('Post not found');

    const comment = new CommentEntity({
      content,
      user,
      post,
    });

    return this.commentRepository.save(comment);
  }

  async findAllByPost(post: PostEntity) {
    return this.commentRepository.find({
      where: { post },
      relations: ['user', 'post'],
    });
  }

  findOne(id: number) {
    return this.commentRepository.findOne(id);
  }

  remove(commentId: number, user: UserEntity) {
    return this.commentRepository.delete({ id: commentId, user });
  }
}
