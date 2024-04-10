import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserService } from 'src/user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './passport/ local.strategy';
import { PassportModule } from '@nestjs/passport';
import { User } from 'src/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSetting } from 'src/user-settings/entities/user-setting.entity';
import { config } from 'dotenv';
import { JwtStrategy } from './passport/jwt.strategy';

config();
console.log('dmo', process.env.JWT_SECRET);

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '600s' },
    }),
    TypeOrmModule.forFeature([User, UserSetting]),
  ],
  providers: [
    AuthResolver,
    AuthService,
    UserService,
    LocalStrategy,
    JwtStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
