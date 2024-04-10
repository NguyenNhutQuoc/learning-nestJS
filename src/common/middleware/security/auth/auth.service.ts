import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GetUserRequest } from 'src/user/dto/get-user.request';
import { UserService } from 'src/user/user.service';
import { User } from '../../../../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    const request = new GetUserRequest();
    request.name = username;
    request.password = password;
    request.orderBy = '';
    const listResult = await this.userService.findByRequest(request);

    if (listResult.data.length > 0) {
      const user = listResult.data[0];
      console.log('user login', user);
      const payload = {
        username: user.name,
        sub: user.id,
        roles: user.isAdmin ? ['admin'] : ['user'],
      };
      user.access_token = this.jwtService.sign(payload);
      return user;
    }

    throw new UnauthorizedException();
  }

  validateToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      return null;
    }
  }
}
