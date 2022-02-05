import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Role } from '@/common/role.enum';

@Entity({ name: 'tbl_user' })
export class UserEntity {
  constructor(partial?: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @ApiProperty()
  @Column({ nullable: false, length: 64, unique: true })
  username: string;

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdAt: Date;

  @Exclude()
  @Column({ nullable: false })
  password?: string;

  @ApiProperty({ enum: Role })
  @Column({ type: 'enum', enum: Role, nullable: false, default: Role.User })
  roles: Role[];

  @ApiProperty()
  @Column({
    name: 'scheduled_for_deletion',
    default: false,
    nullable: false,
  })
  scheduledForDeletion: boolean;

  get isAdmin(): boolean {
    return this.roles.includes(Role.Admin);
  }

  get isModerator(): boolean {
    return this.roles.includes(Role.Moderator) || this.isAdmin;
  }
}
