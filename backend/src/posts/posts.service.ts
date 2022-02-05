import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from '@/users/entities/user.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
  ) {}

  async create(createPostDto: CreatePostDto, user: UserEntity) {
    const post = new PostEntity({
      content: createPostDto.content,
      title: createPostDto.title,
      user,
    });

    return this.postRepository.save(post, {});
  }

  async findAll() {
    return this.postRepository.find({});
  }

  async findAllByUser(userId: number) {
    return this.postRepository.find({
      where: { user: userId },
    });
  }

  async findOne(id: number) {
    return this.postRepository.findOne({ id });
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.postRepository.findOne(id);

    if (!post) throw new NotFoundException('Post not found');

    if (Object.keys(updatePostDto).length === 0) {
      throw new BadRequestException('No fields to update');
    }

    for (const [key, value] of Object.entries(updatePostDto)) {
      post[key] = value;
    }

    post.updatedAt = new Date();

    return this.postRepository.save(post);
  }

  async remove(id: number, user: UserEntity) {
    const post = await this.postRepository.findOne(id);

    if (!post) throw new NotFoundException('Post not found');

    if (post.user !== user && !user.isModerator) {
      throw new NotFoundException(
        'You do not have permission to delete this post',
      );
    }

    return this.postRepository.remove(post);
  }
}
