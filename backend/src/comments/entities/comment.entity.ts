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

@Entity({ name: 'tbl_comment' })
export class CommentEntity {
  constructor(partial?: Partial<CommentEntity>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => UserEntity, { eager: false })
  @JoinColumn()
  user: UserEntity;

  @ManyToOne(() => PostEntity, { eager: false })
  @JoinColumn()
  post: PostEntity;
}
