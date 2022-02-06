import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { UserEntity } from '@/users/entities/user.entity';
import { Exclude } from 'class-transformer';
import { CommentEntity } from '@/comments/entities/comment.entity';

@Entity({ name: 'tbl_post' })
export class PostEntity {
  constructor(partial?: Partial<PostEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ nullable: false })
  title: string;

  @ApiProperty()
  @Column({ nullable: false })
  content: string;

  @ApiProperty()
  @CreateDateColumn({ nullable: false })
  createdAt: Date;

  @ApiProperty()
  @CreateDateColumn({ nullable: false })
  updatedAt: Date;

  @ApiProperty({ type: () => UserEntity })
  @ManyToOne(() => UserEntity, { eager: true, nullable: false })
  @JoinColumn()
  user: UserEntity;

  @ApiProperty({ type: () => CommentEntity })
  @OneToMany(() => CommentEntity, (comment) => comment.post, {
    eager: true,
    nullable: false,
  })
  @JoinColumn()
  comments: CommentEntity[];
}
