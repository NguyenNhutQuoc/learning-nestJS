import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { GetUserRequest } from './dto/get-user.request';
import { UserListResult } from './dto/list-user-result';
import { UserSetting } from 'src/user-settings/entities/user-setting.entity';
import { DataLoaderService } from 'src/common/service/dataloader.service';
import { Profile } from 'src/profile/entities/profile.entity';
import { ParseUUIDPipe, UsePipes, ValidationPipe } from '@nestjs/common';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'FindById' })
  findOne(@Args('id', { type: () => ID }, new ParseUUIDPipe()) id: string) {
    return this.userService.findBy({ id });
  }

  @Query(() => [User], { name: 'FindByName' })
  findByName(
    @Args('name', { type: () => String, nullable: true }) name?: string,
  ) {
    return this.userService.findOneNotUseCreateBuilder({ name });
  }

  @Query(() => UserListResult, { name: 'FindByRequest' })
  findByRequest(@Args('request') request: GetUserRequest) {
    return this.userService.findByRequest(request);
  }

  @ResolveField(() => [UserSetting], { name: 'userSettings' })
  async userSettings(@Parent() user: User) {
    const userSettingLoader = new DataLoaderService<User, UserSetting>(
      this.userService,
    );

    return userSettingLoader.getLoader('userSettings').load(user.id);
  }

  @ResolveField(() => [UserSetting], { name: 'profile' })
  async profile(@Parent() user: User) {
    const profileLoader = new DataLoaderService<User, Profile>(
      this.userService,
    );

    return profileLoader.getLoader('profile').load(user.id);
  }
}
