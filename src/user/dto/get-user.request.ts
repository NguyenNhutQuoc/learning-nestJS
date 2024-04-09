import { Field, InputType } from '@nestjs/graphql';
import { BaseRequest } from 'src/common/base/base-get-request';

@InputType()
export class GetUserRequest extends BaseRequest {
  @Field(() => String, { nullable: true })
  id: string;
  @Field(() => String, { nullable: true })
  name: string;
  @Field(() => String, { nullable: true })
  email: string;

  constructor() {
    super();
  }
}
