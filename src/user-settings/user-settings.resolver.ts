import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UserSettingsService } from './user-settings.service';
import { UserSetting } from './entities/user-setting.entity';
import { CreateUserSettingInput } from './dto/create-user-setting.input';
import { User } from '../user/entities/user.entity'; // Import the User entity from the correct file path
import { DataLoaderService } from 'src/common/service/dataloader.service';

@Resolver(() => UserSetting)
export class UserSettingsResolver {
  constructor(private readonly userSettingsService: UserSettingsService) {}

  @Mutation(() => UserSetting)
  createUserSetting(
    @Args('createUserSettingInput')
    createUserSettingInput: CreateUserSettingInput,
  ) {
    return this.userSettingsService.create(createUserSettingInput);
  }

  @Query(() => [UserSetting], { name: 'userSettings' })
  findAll() {
    return this.userSettingsService.findAll();
  }

  // ...

  @ResolveField(() => User, { name: 'user' }) // Update the import path for the User entity
  user(@Parent() userSetting: UserSetting) {
    const dataService = new DataLoaderService<UserSetting, User>(
      this.userSettingsService,
    );

    return dataService.getLoader('user').load(userSetting.id);
  }
}
