import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { instanceToInstance } from 'class-transformer';

import { CreateUserDto } from '@/auth/dto/create-user.dto';
import { UserEntity } from '@/users/entities/user.entity';
import { Password } from '@/common/password.class';
import { DeleteUserResponseDto } from './dto/delete-user-response.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findOne(userId: number): Promise<UserEntity> {
    return this.userRepository
      .findOne({ id: userId })
      .then((user) => this.notFoundHandler(user));
  }

  async findByUsername(username: string): Promise<UserEntity> {
    return this.userRepository.findOne({ username });
  }

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async create(user: CreateUserDto): Promise<UserEntity> {
    const newUser = new UserEntity({
      username: user.username,
      password: await Password.hashPassword(user.password),
    });

    const existingUser = await this.findByUsername(user.username);

    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    return this.userRepository.save(newUser);
  }

  async delete(user: UserEntity): Promise<DeleteUserResponseDto> {
    user.scheduledForDeletion = true;
    this.userRepository.update(user, user);

    return {
      message: 'User scheduled for deletion',
    };
  }

  private async notFoundHandler(user?: UserEntity): Promise<UserEntity> {
    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  static serializeUser(user: UserEntity): UserEntity {
    return instanceToInstance(user);
  }
}
