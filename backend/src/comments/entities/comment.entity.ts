import {
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Entity,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';

import { UserEntity } from '@/users/entities/user.entity';
import { PostEntity } from '@/posts/entities/post.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

@Entity({ name: 'tbl_comment' })
export class CommentEntity {
  constructor(partial?: Partial<CommentEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  content: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @Exclude()
  @ManyToOne(() => UserEntity, { eager: false })
  @JoinColumn()
  user: UserEntity;

  @Exclude()
  @ManyToOne(() => PostEntity, { eager: false })
  @JoinColumn()
  post: PostEntity;
}
