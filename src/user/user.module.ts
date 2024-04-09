import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserSetting } from 'src/user-settings/entities/user-setting.entity';
import { UserSettingsService } from 'src/user-settings/user-settings.service';
import { ProfileService } from 'src/profile/profile.service';
import { Profile } from 'src/profile/entities/profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserSetting, Profile])],
  providers: [UserResolver, UserService, UserSettingsService, ProfileService],
})
export class UserModule {}
