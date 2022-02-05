import { forwardRef, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '@/users/users.module';
import { RefreshTokenEntity } from './entities/refresh-token.entity';
import { AppModule } from '@/app.module';

@Module({
  controllers: [AuthController],
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([RefreshTokenEntity]),
    forwardRef(() => AppModule),
  ],
  providers: [AuthService, ConfigService],
})
export class AuthModule {}
