import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base/base-service';
import { GetUserRequest } from './dto/get-user.request';
import { ListResult } from '../common/base/list-result';
import { UserSetting } from 'src/user-settings/entities/user-setting.entity';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(UserSetting)
    private userSettingRepository: Repository<UserSetting>,
  ) {
    super(userRepository);
  }

  async create(createUserInput: CreateUserInput) {
    const newUser = this.userRepository.create({
      name: createUserInput.name,
      email: createUserInput.email,
      password: createUserInput.password,
      userSettings: [],
    });

    return await this.userRepository.save(newUser);
  }

  findById(id: string) {
    return this.repository.findBy({ id });
  }

  findByRequest(
    request: GetUserRequest,
  ): Promise<ListResult<User> | undefined> {
    const where = {} as FindOptionsWhere<User>;
    if (request.id) {
      where.id = request.id;
    }
    if (request.name) {
      where.name = request.name;
    }
    if (request.email) {
      where.email = request.email;
    }
    if (request.password) {
      where.password = request.password;
    }

    console.log(request);

    const skip = (request.pageIndex - 1) * request.pageSize;
    return this.findAllBy(
      where,
      request.orderBy,
      request.pageIndex,
      skip,
      request.pageSize,
    );
  }

  findUserSettings(userId: string) {
    return this.userSettingRepository.find({
      where: { user: { id: userId } },
    });
  }
}
