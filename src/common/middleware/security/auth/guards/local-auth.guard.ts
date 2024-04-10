import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {
    super();
  }

  getRequest(context: any) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  canActivate(context: any) {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    const args = ctx.getArgs();
    request.body = {
      username: args.username,
      password: args.password,
    };

    return this.validateRequest(request);
  }

  private async validateRequest(request: any): Promise<boolean> {
    const user = await this.authService.validateUser(
      request.body.username,
      request.body.password,
    );
    console.log('user', user);
    if (!user) {
      throw new UnauthorizedException();
    }
    request.user = user;
    return true;
  }
}
