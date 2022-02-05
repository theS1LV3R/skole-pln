import { UserEntity } from '@/users/entities/user.entity';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'tbl_refresh_token' })
export class RefreshTokenEntity {
  constructor(partial?: Partial<RefreshTokenEntity>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Exclude()
  @Column()
  token: string;

  @OneToOne(() => RefreshTokenEntity, (token) => token.replacedBy, {
    eager: false,
  })
  @JoinColumn()
  replaces?: RefreshTokenEntity;

  @OneToOne(() => RefreshTokenEntity, (token) => token.replaces, {
    eager: false,
  })
  @JoinColumn()
  replacedBy?: RefreshTokenEntity;

  @CreateDateColumn()
  created: Date;

  @Column({ nullable: true })
  revokationDate?: Date;

  @Column({ default: false })
  manuallyRevoked: boolean;

  @ManyToOne(() => UserEntity, { eager: false })
  @JoinColumn()
  user: UserEntity;

  @Column({ nullable: false })
  expiresAt: Date;

  get isInvalid() {
    if (this.manuallyRevoked) return true;

    if (this.revokationDate < new Date()) return true;

    if (this.replacedBy) return true;

    return false;
  }
}
