import { Resolver, Query, Args, Context } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser, Roles } from '../../../../decorators/auth.decorator';
import { RolesGuard } from './guards/roles.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Resolver()
export class AuthResolver {
  constructor() {}

  @UseGuards(LocalAuthGuard)
  @Query(() => User, { name: 'signIn' })
  async signIn(
    @Args('username') username: string,
    @Args('password') password: string,
    @Context() context: any,
  ): Promise<any> {
    return context.req.user;
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(['admin'])
  @Query(() => User, { name: 'getProfileAfterAuth' })
  async profile(@CurrentUser() user: any): Promise<any> {
    return user;
  }
}
