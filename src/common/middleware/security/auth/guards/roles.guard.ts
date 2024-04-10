import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Roles } from '../../../../../decorators/auth.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>(Roles, context.getHandler());
    if (!roles) {
      return true;
    }
    const request = GqlExecutionContext.create(context).getContext().req;
    const user = request.user;
    console.log('user', user);
    return roles.some((role) => user.roles?.includes(role));
  }
}
