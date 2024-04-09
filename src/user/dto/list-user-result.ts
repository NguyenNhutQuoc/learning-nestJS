import { ObjectType } from '@nestjs/graphql';
import { ListResultGenerateClass } from 'src/common/base/list-result';
import { User } from '../entities/user.entity';

@ObjectType()
export class UserListResult extends ListResultGenerateClass(User) {
  // No need to define anything here, UserListResult will inherit properties from the dynamically generated ListResult class
}
